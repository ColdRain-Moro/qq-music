export type RecommendationsResponse = {
    /** 官方歌单 */
    offical: Array<{
        cover: string,
        title: string,
        views: number,
    }>,
    /** 达人歌单 */
    tatsujin: Array<{
        cover: string,
        title: string,
        views: number,
    }>,
    /** 专区 */
    column: Array<{
        title: string,
        description: string,
        icon: string,
        background: string,
    }>,
};

export type RankingResponse = Array<{
    title: string,
    top3: Array<{
        title: string,
        artist: Array<string>,
    }>
    cover: string,
    views: number,
    update_frequence: '日' | '周'
}>

export type HotResponse = Array<string>

export type SearchResponse = Array<{
    title: string,
    artist: Array<string>,
}> | string