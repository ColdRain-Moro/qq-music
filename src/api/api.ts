import { HotResponse, RankingResponse, RecommendationsResponse, SearchResponse } from "./response-types"

export const BASE_URL = "http://124.221.249.219:8000/api"

export async function getRecommendations(): Promise<RecommendationsResponse> {
    return await (await fetch(`${BASE_URL}/recommendations`)).json()
}

export async function getRanking(): Promise<RankingResponse> {
    return await (await fetch(`${BASE_URL}/ranking`)).json()
}

export async function getHot(): Promise<HotResponse> {
    return await (await fetch(`${BASE_URL}/hot`)).json()
}

export async function search(key: string): Promise<SearchResponse> {
    const res = await fetch(`${BASE_URL}/search?keyword=${key}`)
    try {
        return await res.json() 
    } catch (error) {
        return await res.text()
    }
}