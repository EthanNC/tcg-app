/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    "Api": {
      "name": string
      "type": "sst.aws.Function"
      "url": string
    }
    "Cardfaces": {
      "name": string
      "type": "sst.aws.Bucket"
    }
    "Database": {
      "database": string
      "host": string
      "password": string
      "port": number
      "type": "sst.sst.Linkable"
      "user": string
    }
    "Email": {
      "sender": string
      "type": "sst.aws.Email"
    }
    "MyRouter": {
      "type": "sst.aws.Router"
      "url": string
    }
    "StaticSite": {
      "type": "sst.aws.StaticSite"
      "url": string
    }
  }
}
export {}
