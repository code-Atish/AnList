import { gql } from '@apollo/client';


const getAnime = gql`
query getAnime($page: Int, $perPage: Int,$search:String,$sort:[MediaSort],$seasonYear:Int,
  $format_in:[MediaFormat], $season:MediaSeason, $genre_in:[String],$status:MediaStatus,$source:MediaSource){
  Page(page:$page,perPage:$perPage){
    media(search:$search,isAdult:false,type:ANIME,sort:$sort,seasonYear:$seasonYear,
    season:$season,format_in:$format_in,genre_in:$genre_in,source:$source,status:$status){
      id
      status
      season
      seasonYear
      episodes
      format
      meanScore
      genres
      source
      description
      hashtag
      bannerImage
      title {
        romaji
        english
        native
      }
      startDate {
        year
        month
        day
      }
      studios(isMain: true) {
        nodes{
          name
          isAnimationStudio
        }
      }
      nextAiringEpisode {
        timeUntilAiring,episode
      }
      coverImage {
        extraLarge
        color
      }
      externalLinks {
        url
        site
        icon
        color
        notes
        language
      }
      relations{
        edges{
          relationType(version:2)
          node{
              title{
              romaji
              english
            }
          }
        }
      } 
    }
  }
}
`;

// 
const getDetails=gql`
query Details($id:Int,$page:Int,$perPage:Int,$language:StaffLanguage,$charPage:Int,$charPerPage:Int,
    $staffPage:Int,$staffPerPage:Int){
  Page(page: 1, perPage: 1) {
    media(id: $id) {
      id
      bannerImage
      description
      status
      episodes
      duration
      format
      startDate {
        year
        month
        day
      }
      season
      seasonYear
      averageScore
      meanScore
      popularity
      favourites
      studios(sort:FAVOURITES_DESC){
        edges{
          isMain
          node{
            name
          }
        }
      }
      source
      genres
      trailer {
        thumbnail
        site
      }
      relations {
        edges {
          relationType(version:2)
          node {
            id
            title {
              romaji
              english
              native
            }
            coverImage {
              extraLarge
              color
            }
            type
            status
            format
          }
        }
      }
      coverImage {
        extraLarge
        color
      }
      rankings{
        id
        rank
        type
        context
        year
      }
      externalLinks {
        url
        site
        icon
        color
        notes
        language
      }
      streamingEpisodes{
        title
        thumbnail
        url
        site
      }
      nextAiringEpisode {
        id
        airingAt
        timeUntilAiring
        episode
      }
      title {
        romaji
        english
        native
      }
      recommendations(sort:RATING_DESC,perPage:$perPage,page:$page){
        pageInfo{
          hasNextPage
          currentPage
        }
        nodes{
          mediaRecommendation{
            id
            title{
              romaji
              english
              native
            }
            coverImage{
              color
              extraLarge
            }
            popularity
          }
        }
      }
      staff(sort:[RELEVANCE],page: $staffPage,perPage: $staffPerPage){
        pageInfo{
          hasNextPage
          currentPage
        }
        edges{
          role
          node{
            image{
              large
            }
            name {
              full
            }
          }
        }
      }
      characters(sort: [ROLE, RELEVANCE], page: $charPage, perPage: $charPerPage) {
        pageInfo{
          currentPage
          hasNextPage
        }
        edges {
          role
          name
          node {
            name {
              full
            }
            image {
              large
            }
          }
          voiceActors(language: $language) {
            languageV2
            name {
              userPreferred
              full
            }
            image {
              large
            }
          }
        }
      }
    }
  }
}
`;

const getCharacterDetails=gql`
query CharDetails($id:Int,$language:StaffLanguage,$charPage:Int,$charPerPage:Int){
  Page(page: 1, perPage: 1) {
    media(id: $id) {
      id
      characters(sort: [ROLE, RELEVANCE,FAVOURITES_DESC], page: $charPage, perPage: $charPerPage) {
        pageInfo{
          currentPage
          hasNextPage
        }
        edges {
          role
          name
          node {
            name {
              full
            }
            image {
              large
            }
          }
          voiceActors(language: $language) {
            languageV2
            name {
              userPreferred
              full
            }
            image {
              large
            }
          }
        }
      }
    }
  }
}
`;
export {getAnime,getDetails,getCharacterDetails};
