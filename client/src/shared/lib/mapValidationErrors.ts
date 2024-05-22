import { BaseSchema, safeParse, SchemaIssue } from "valibot";

export function mapValidationErrors<T>(schema: BaseSchema, data: T):string[] {
  return safeParse(schema, data)
    .issues!.map((issue: SchemaIssue):string => issue.message)
}