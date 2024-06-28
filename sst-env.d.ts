/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    Api: {
      name: string
      type: "sst.aws.Function"
      url: string
    }
    Database: {
      database: string
      host: string
      password: string
      port: number
      type: "supabase.index/project.Project"
      user: string
    }
    StaticSite: {
      type: "sst.aws.StaticSite"
      url: string
    }
  }
}
export {}