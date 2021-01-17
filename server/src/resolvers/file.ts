import { Field, ObjectType, Query, Resolver } from 'type-graphql';

@ObjectType()
export class File {
  @Field()
  url: string;

  @Field()
  filename: string;

  @Field()
  mimetype: string;

  @Field()
  encoding: string;
}

@Resolver(File)
export class FileResolver {
  @Query(() => [File])
  async allFiles(): Promise<File[]> {
    return [];
  }
}
