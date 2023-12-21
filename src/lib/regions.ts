import Client from '../client'

interface RegionResponse {
  name: string
  code: string
  latitude: number | null
  longitude: number | null
  gatewayAvailable: boolean
  requiresPaidPlan: boolean
}

interface PlatformResponse {
  requestRegion: string | null
  regions: RegionResponse[]
}

export interface GetRegionsOutput {
  platform: PlatformResponse
}

const getRegionsQuery = `query {
  platform {
    requestRegion
    regions {
      name
      code
      latitude
      longitude
      gatewayAvailable
      requiresPaidPlan
    }
  }
}`

export class Regions {
  private client: Client

  constructor(client: Client) {
    this.client = client
  }

  async getRegions(): Promise<GetRegionsOutput> {
    return this.client.gqlPostOrThrow({
      query: getRegionsQuery,
      variables: {},
    })
  }
}