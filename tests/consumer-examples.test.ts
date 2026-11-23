// @vitest-environment node
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import {
  consumerExampleIds,
  getConsumerExample,
} from "../.storybook/source-examples.js";

const ui = fileURLToPath(new URL("..", import.meta.url));
const read = (relative: string) =>
  readFileSync(path.join(ui, relative), "utf8");
const slug = (name: string) =>
  name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
type Snippet = { id: string; code: string };

function unwrap(expression: ts.Expression): ts.Expression {
  if (
    ts.isSatisfiesExpression(expression) ||
    ts.isAsExpression(expression) ||
    ts.isParenthesizedExpression(expression)
  )
    return unwrap(expression.expression);
  return expression;
}

function property(
  expression: ts.Expression | undefined,
  names: readonly string[],
): ts.Expression | undefined {
  if (!expression || !names.length) return expression;
  const object = unwrap(expression);
  if (!ts.isObjectLiteralExpression(object)) return undefined;
  const entry = object.properties.find(
    (item): item is ts.PropertyAssignment =>
      ts.isPropertyAssignment(item) &&
      (ts.isIdentifier(item.name) || ts.isStringLiteral(item.name)) &&
      item.name.text === names[0],
  );
  return property(entry?.initializer, names.slice(1));
}

function stringValue(
  expression: ts.Expression | undefined,
  variables: ReadonlyMap<string, ts.Expression>,
): string | undefined {
  if (!expression) return undefined;
  const value = unwrap(expression);
  if (ts.isStringLiteralLike(value)) return value.text;
  if (ts.isIdentifier(value))
    return stringValue(variables.get(value.text), variables);
  if (
    ts.isCallExpression(value) &&
    ts.isPropertyAccessExpression(value.expression) &&
    value.expression.name.text === "replace"
  ) {
    const source = stringValue(value.expression.expression, variables);
    const before = stringValue(value.arguments[0], variables);
    const after = stringValue(value.arguments[1], variables);
    if (source !== undefined && before !== undefined && after !== undefined)
      return source.replace(before, after);
  }
  return undefined;
}

function storyModule(relative: string) {
  const source = ts.createSourceFile(
    relative,
    read(relative),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const variables = new Map<string, ts.Expression>();
  const exports: { name: string; expression: ts.Expression }[] = [];
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || !declaration.initializer)
        continue;
      variables.set(declaration.name.text, declaration.initializer);
      if (
        statement.modifiers?.some(
          (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
        )
      )
        exports.push({
          name: declaration.name.text,
          expression: declaration.initializer,
        });
    }
  }
  // Metadata is read as data; no story, render function or play is executed.
  const meta = variables.get("meta");
  const id = stringValue(property(meta, ["id"]), variables);
  if (!id) throw new Error(`Missing stable meta.id in ${relative}`);
  return { id, meta, variables, exports };
}

const componentFiles = readdirSync(path.join(ui, "stories/components"))
  .filter((file) => file.endsWith(".stories.tsx"))
  .sort();
const componentIds = componentFiles.flatMap((file) => {
  const module = storyModule(`stories/components/${file}`);
  return module.exports.map(({ name }) => `${module.id}--${slug(name)}`);
});

const compositionSnippets: Snippet[] = readdirSync(
  path.join(ui, "stories/compositions"),
)
  .filter((file) => file.endsWith(".stories.tsx"))
  .sort()
  .flatMap((file) => {
    const module = storyModule(`stories/compositions/${file}`);
    const defaultSource = property(module.meta, [
      "parameters",
      "docs",
      "source",
      "code",
    ]);
    return module.exports.map(({ name, expression }) => {
      const id = `${module.id}--${slug(name)}`;
      const source = property(expression, [
        "parameters",
        "docs",
        "source",
        "code",
      ]);
      const code =
        stringValue(source ?? defaultSource, module.variables) ??
        getConsumerExample(id);
      if (!code) throw new Error(`Missing copyable consumer example for ${id}`);
      return { id, code };
    });
  });

const controlCases: {
  id: string;
  args: Record<string, unknown>;
  props: Record<string, string | boolean>;
  child?: string;
}[] = [
  {
    id: "components-button--default",
    args: {
      variant: "outline",
      size: "lg",
      disabled: true,
      children: 'Save "quoted" <settings>',
    },
    props: { variant: "outline", size: "lg", disabled: true },
    child: 'Save "quoted" <settings>',
  },
  {
    id: "components-input--default",
    args: {
      label: 'Workspace "name" <tag>',
      placeholder: "A & B",
      size: "md",
      required: true,
      error: "Required",
      disabled: false,
      onChange: () => "do-not-serialize-callbacks",
    },
    props: {
      label: 'Workspace "name" <tag>',
      placeholder: "A & B",
      size: "md",
      required: true,
      error: "Required",
      disabled: false,
    },
  },
  {
    id: "components-textarea--default",
    args: {
      label: "Notes",
      size: "lg",
      resize: "vertical",
      readOnly: true,
      defaultValue: "First\nSecond",
    },
    props: {
      label: "Notes",
      size: "lg",
      resize: "vertical",
      readOnly: true,
      defaultValue: "First\nSecond",
    },
  },
  {
    id: "components-badge--default",
    args: { variant: "success", size: "sm", children: "Active" },
    props: { variant: "success", size: "sm" },
    child: "Active",
  },
  {
    id: "components-alert--default",
    args: { variant: "success", ariaLive: "polite" },
    props: { variant: "success", ariaLive: "polite" },
  },
];

function parsedSnippet(code: string): ts.SourceFile {
  return ts.createSourceFile(
    "example.tsx",
    code,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
}

function walk(node: ts.Node, visit: (node: ts.Node) => void): void {
  visit(node);
  ts.forEachChild(node, (child) => walk(child, visit));
}

function compile(snippets: readonly Snippet[]): string[] {
  const parsed = ts.getParsedCommandLineOfConfigFile(
    path.join(ui, "tsconfig.json"),
    {},
    {
      ...ts.sys,
      onUnRecoverableConfigFileDiagnostic: (diagnostic) => {
        throw new Error(
          ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
        );
      },
    },
  );
  if (!parsed)
    throw new Error("Could not read the UI TypeScript configuration");
  const options: ts.CompilerOptions = {
    ...parsed.options,
    strict: true,
    noEmit: true,
    noUnusedLocals: true,
    paths: { "@pycolors/ui": [path.join(ui, "src/index.ts")] },
  };
  const virtual = new Map(
    snippets.map(({ code }, index) => [
      path.join(ui, ".storybook", `__consumer-check-${index}.tsx`),
      code,
    ]),
  );
  const host = ts.createCompilerHost(options);
  const readFile = host.readFile.bind(host);
  const fileExists = host.fileExists.bind(host);
  const getSourceFile = host.getSourceFile.bind(host);
  host.readFile = (file) => virtual.get(file) ?? readFile(file);
  host.fileExists = (file) => virtual.has(file) || fileExists(file);
  host.getSourceFile = (file, language, onError, fresh) => {
    const source = virtual.get(file);
    return source === undefined
      ? getSourceFile(file, language, onError, fresh)
      : ts.createSourceFile(file, source, language, true, ts.ScriptKind.TSX);
  };
  return ts
    .getPreEmitDiagnostics(ts.createProgram([...virtual.keys()], options, host))
    .map((diagnostic) => {
      const match = diagnostic.file?.fileName.match(
        /__consumer-check-(\d+)\.tsx$/,
      );
      const id = match
        ? snippets[Number(match[1])]?.id
        : diagnostic.file?.fileName;
      return `${id ?? "TypeScript configuration"}: ${ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n")}`;
    });
}

describe("copyable public consumer examples", () => {
  it("covers every canonical component state and keeps catalog entries tied to existing stories", () => {
    const publicFamilies = [
      ...read("src/index.ts").matchAll(/components\/ui\/(.+)\.js/g),
    ]
      .map((match) => match[1])
      .sort();
    expect(
      componentFiles.map((file) => file.replace(".stories.tsx", "")).sort(),
    ).toEqual(publicFamilies);
    for (const id of componentIds)
      expect(getConsumerExample(id), id).toBeTypeOf("string");
    const knownIds = new Set([
      ...componentIds,
      ...compositionSnippets.map(({ id }) => id),
    ]);
    for (const id of consumerExampleIds)
      expect(knownIds.has(id), `stale example ${id}`).toBe(true);
    expect(getConsumerExample("components-unknown--default")).toBeUndefined();
    expect(getConsumerExample("constructor")).toBeUndefined();
  });

  it("keeps historical story URLs on their canonical consumer examples", () => {
    const ledger = [
      ...read("stories/README.md").matchAll(
        /\|\s+`(ui-public-component-surface--[^`]+)`\s+\|\s+`(components-[^`]+)`\s+\|/g,
      ),
    ];
    const historical = [
      ...read("stories/public-surface.stories.tsx").matchAll(
        /export const (\w+):/g,
      ),
    ]
      .map((match) => `ui-public-component-surface--${slug(match[1]!)}`)
      .sort();
    expect(ledger.length).toBeGreaterThan(0);
    expect(ledger.map((entry) => entry[1]).sort()).toEqual(historical);
    for (const [, oldId, canonicalId] of ledger) {
      expect(getConsumerExample(oldId!), oldId).toBe(
        getConsumerExample(canonicalId!),
      );
    }
  });

  it("reflects Controls as valid literal props without serializing callbacks or JSX input", () => {
    for (const { id, args, props, child } of controlCases) {
      const code = getConsumerExample(id, args);
      if (!code) throw new Error(`Missing controlled example ${id}`);
      const attributes = new Map<string, string | boolean>();
      const literalChildren: string[] = [];
      walk(parsedSnippet(code), (node) => {
        if (ts.isJsxAttribute(node) && ts.isIdentifier(node.name)) {
          const initializer = node.initializer;
          const value =
            initializer && ts.isJsxExpression(initializer)
              ? initializer.expression
              : initializer;
          if (value && ts.isStringLiteral(value))
            attributes.set(node.name.text, value.text);
          else if (value?.kind === ts.SyntaxKind.TrueKeyword)
            attributes.set(node.name.text, true);
          else if (value?.kind === ts.SyntaxKind.FalseKeyword)
            attributes.set(node.name.text, false);
        }
        if (
          ts.isJsxExpression(node) &&
          node.expression &&
          ts.isStringLiteral(node.expression)
        )
          literalChildren.push(node.expression.text);
      });
      for (const [name, value] of Object.entries(props))
        expect(attributes.get(name), `${id} ${name}`).toBe(value);
      if (child !== undefined) expect(literalChildren, id).toContain(child);
      expect(code).not.toContain("do-not-serialize-callbacks");
      expect(attributes.has("onChange")).toBe(false);
    }
  });

  it("uses public package imports and compiles every example against the current public API", () => {
    const snippets: Snippet[] = [
      ...componentIds.map((id) => ({ id, code: getConsumerExample(id)! })),
      ...compositionSnippets,
      ...controlCases.map(({ id, args }) => ({
        id: `${id} Controls`,
        code: getConsumerExample(id, args)!,
      })),
    ];
    const importsAllowed = new Set(["@pycolors/ui", "react", "lucide-react"]);
    for (const { id, code } of snippets) {
      let importsPublicUi = false;
      walk(parsedSnippet(code), (node) => {
        if (
          ts.isImportDeclaration(node) &&
          ts.isStringLiteral(node.moduleSpecifier)
        ) {
          const specifier = node.moduleSpecifier.text;
          expect(
            importsAllowed.has(specifier),
            `${id} imports ${specifier}`,
          ).toBe(true);
          if (specifier === "@pycolors/ui") importsPublicUi = true;
        }
        if (
          ts.isCallExpression(node) &&
          (node.expression.kind === ts.SyntaxKind.ImportKeyword ||
            (ts.isIdentifier(node.expression) &&
              node.expression.text === "require"))
        )
          throw new Error(`${id} must not depend on a dynamic fixture import`);
      });
      expect(importsPublicUi, id).toBe(true);
    }
    expect(compile(snippets)).toEqual([]);
  }, 30_000);
});
