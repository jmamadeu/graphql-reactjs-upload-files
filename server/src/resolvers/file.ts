import { FileUpload, UploadOptions } from 'graphql-upload';

import {
  Arg,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';

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

@InputType()
export class FileInput {}

@Resolver(File)
export class FileResolver {
  @Query(() => [File])
  async allFiles(): Promise<File[]> {
    return [];
  }

  @Mutation(() => File)
  async uploadFile(@Arg('file') file: FileUpload): Promise<File> {
    console.log(file);
    return {} as File;
  }
}
