import { getHot, getRanking, getRecommendations, search } from './api/api'
import { ColumnSlideBox } from './components/column-slide-box'
import { FlowBox } from './components/flow-box'
import { FlowItem } from './components/flow-item'
import { RowSlideBox } from './components/row-slide-box'
import { Search } from './components/search'
import './style.css'

(async () => {
    // 搜索历史
    const searchHistory: string[] = []

    // 请求推荐数据
    const recommendData = await getRecommendations()
    // 请求排行数据
    const rankingData = await getRanking()
    // 请求搜索热词数据
    const hotData = await getHot()
    const officalSlider = document.querySelector('#offical-list') as RowSlideBox
    const intelligentList = document.querySelector('#intelligent-list') as RowSlideBox
    const columnList = document.querySelector("#column-list") as RowSlideBox
    const rankList = document.querySelector("#rank-list") as ColumnSlideBox
    const hotList = document.querySelector("#hot-key") as FlowBox

    // 加载推荐数据
    officalSlider.loadData(recommendData.offical, d => {
        const item = document.createElement('song-list-item')
        const playCount = document.createElement('span')
        playCount.setAttribute("slot", "play-count")
        playCount.innerText = d.views.toString()
        const songListName = document.createElement('span')
        songListName.setAttribute("slot", "song-list-name")
        songListName.innerText = d.title
        item.appendChild(playCount)
        item.appendChild(songListName)
        item.setAttribute("cover", d.cover)
        return item
    })

    intelligentList.loadData(recommendData.tatsujin, d => {
        const item = document.createElement('song-list-item')
        const playCount = document.createElement('span')
        playCount.setAttribute("slot", "play-count")
        playCount.innerText = d.views.toString()
        const songListName = document.createElement('span')
        songListName.setAttribute("slot", "song-list-name")
        songListName.innerText = d.title
        item.appendChild(playCount)
        item.appendChild(songListName)
        item.setAttribute("cover", d.cover)
        return item
    })

    columnList.loadData(recommendData.column, d => {
        const item = document.createElement('column-list-item')
        const desc = document.createElement('span')
        desc.setAttribute("slot", "desc")
        desc.innerText = d.description.toString()
        const title = document.createElement('span')
        title.setAttribute("slot", "title")
        title.innerText = d.title
        item.appendChild(desc)
        item.appendChild(title)
        item.setAttribute("background", d.background)
        item.setAttribute("icon", d.icon)
        return item
    })

    rankList.loadData(rankingData, d => {
        const item = document.createElement('rank-item')
        const update = document.createElement('span')
        update.setAttribute("slot", "update")
        update.innerText = "每" + d.update_frequence.toString() + "更新"
        const title = document.createElement('span')
        title.setAttribute("slot", "title")
        title.innerText = d.title
        const playCount = document.createElement('span')
        playCount.setAttribute("slot", "play-count")
        playCount.innerText = d.views.toString()
        const first = document.createElement('span')
        first.setAttribute("slot", "1st")
        first.innerHTML = `<span style="color: rgb(80, 80, 80);">${d.top3[0].title}</span>-<span style="color: rgb(162, 162, 162);">${d.top3[0].artist}</span>`
        const second = document.createElement('span')
        second.setAttribute("slot", "2nd")
        second.innerHTML = `<span style="color: rgb(80, 80, 80);">${d.top3[1].title}</span>-<span style="color: rgb(162, 162, 162);">${d.top3[1].artist}</span>`
        const third = document.createElement('span')
        third.setAttribute("slot", "3rd")
        third.innerHTML = `<span style="color: rgb(80, 80, 80);">${d.top3[2].title}</span>-<span style="color: rgb(162, 162, 162);">${d.top3[2].artist}</span>`
        item.appendChild(playCount)
        item.appendChild(update)
        item.appendChild(title)
        item.appendChild(first)
        item.appendChild(second)
        item.appendChild(third)
        item.setAttribute("cover", d.cover)
        return item
    })

    hotList.loadData(hotData, d => {
        const item = document.createElement('flow-item')
        const title = document.createElement('span')
        const searchBar = document.querySelector("search-bar")?.shadowRoot?.querySelector(".search-input") as HTMLInputElement
        title.setAttribute("slot", "key")
        title.innerText = d
        item.appendChild(title);
        (item as FlowItem).onItemClick = (item) => {
            searchBar.value = item.innerText
        }
        return item
    })

    // 搜索
    const searchBar = document.querySelector("search-bar") as Search
    const searchResultBox = document.querySelector("#search-result") as ColumnSlideBox
    const searchResultPage = document.querySelector("#search-result-page") as HTMLElement
    const searhPage = document.querySelector("#search-page") as HTMLElement
    searchBar.onSearch = (keyword) => {
        searchHistory.push(keyword);
        flushSearchHistory();
        (async () => {
            const searchResult = await search(keyword);
            if (searchResult instanceof String) {
                alert(searchResult)
            } else {
                const data = searchResult as Array<{
                    title: string,
                    artist: Array<string>,
                }>
                searchResultBox.loadData(data, d => {
                    const item = document.createElement('song-item')
                    const songName = document.createElement('span')
                    songName.setAttribute("slot", "song-name")
                    songName.innerText = d.title
                    const artist = document.createElement('span')
                    artist.setAttribute("slot", "artist")
                    artist.innerText = d.artist.join(" · ")
                    item.appendChild(songName)
                    item.appendChild(artist)
                    return item
                });
                searchResultPage.style.display = "block";
                searhPage.style.display = "none";
            }
        })();
    }

    function flushSearchHistory() {
        const searchHistoryBox = document.querySelector("#search-history") as FlowBox
        if (searchHistory.length === 0) {
            searchHistoryBox.style.display = "none"
        } else {
            searchHistoryBox.style.display = "block"
            searchHistoryBox.loadData(searchHistory, d => {
                const item = document.createElement('flow-item')
                const title = document.createElement('span')
                title.setAttribute("slot", "key")
                title.innerText = d
                item.appendChild(title);
                return item
            })
        }
    }
})();

