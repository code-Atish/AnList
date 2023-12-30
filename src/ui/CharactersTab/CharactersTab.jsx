import React, { useRef } from 'react'
import { TitleCase } from '../../converTime';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PropagateLoader } from 'react-spinners';
import SelectDemo from '../SelectDemo';
import { useState } from 'react';
import { getCharacterDetails } from '../../queries/queries';
import { useQuery } from '@apollo/client';

function ImageComponent({src,alt}) {
  return (
    <div style={{ backgroundColor : '#CDD7E1',objectFit:'cover'}}>
        <img className="char_act_image"
            onLoad={(e)=>e.target.style.opacity=1} 
            src={src} alt={alt}
        />
    </div>
  )
}

const CharactersTab = ( { id } ) => {
  const languageRef=useRef("JAPANESE");
  const [VALanguage,setVALanguage]=useState("JAPANESE")
  const { loading, error, data, fetchMore} = useQuery(getCharacterDetails,{
      variables : {
          id:id,
          language:VALanguage,
          charPage:1,
          charPerPage:15
      }
    });
    let state;
    
  if (loading) return (<>
                <SelectDemo 
                    setVALanguage={setVALanguage}
                    languageRef={languageRef}
                    disabled={true}
                />
                <PropagateLoader
                    color={'var(--black-a4)'}
                    loading={true}
                    cssOverride={{
                        display: "flex",
                        justifyContent:'center',
                        width:'100%',
                        height:20,
                        alignItems:'center',
                    }}
                    size={13}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
              </>
              )
  if (error) return <p>Error : {error.message}</p>;
      // if (loading) state='loading';
      // if (error) state='error';
      const Data=data.Page.media[0]
      const characters=Data.characters
    // fetchMoreCharacterData
    const fetchMoreCharacterData = () => {
      try{
      // setCharPageNumber(charPageNumber+1);
      fetchMore({
          variables: {
            charPage:Data.characters.pageInfo.currentPage+1,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            // if (!fetchMoreResult || !fetchMoreResult.Page || !fetchMoreResult.Page.media[0]) {
            //   // Handle the case when fetchMoreResult is null or doesn't have the expected structure
            //   setHasMore(false);
            //   return prev;
            // }
          
            const { media } = fetchMoreResult.Page;
            // if (!media[0].recommendations || media[0].recommendations.nodes.length === 0) {
            //   // Handle the case when recommendations array is empty
            //   setHasMore(false);
            //   return prev;
            // }
            // Update the recommendations array
            // return {
            //   Page: {
            //     ...prev.Page,
            //     media: [
            //       {
            //         ...prev.Page.media[0],
            //         characters: {
            //           ...prev.Page.media[0].characters,
            //                 pageInfo:media[0].characters.pageInfo,
            //                 edges:[...prev.Page.media[0].characters.edges, ...media[0].characters.edges],
            //         },
            //       },
            //     ],
            //   },
            // };
            return {
                Page: {
                  ...prev.Page,
                  media: [
                    {
                      ...prev.Page.media[0],
                      characters: {
                        ...prev.Page.media[0].characters,
                        pageInfo: media[0].characters.pageInfo,
                        edges: [
                          ...prev.Page.media[0].characters.edges,
                          ...media[0].characters.edges.map((edge) => {
                            // Ensure 'voiceActors' is present in the edge node
                            if (!edge.node.voiceActors) {
                              // console.error("Missing 'voiceActors' field in the result:", edge);
                              // // You can provide a default or handle this case as needed
                              // // For example, you can assign an empty array
                              edge.node.voiceActors = [];
                            }
                            return edge;
                          }),
                        ],
                      },
                    },
                  ],
                },
              };
          },
        });
    }catch(error) {
      console.log(error);
    }
      };

    return (<>
          <SelectDemo 
              setVALanguage={setVALanguage}
              languageRef={languageRef}
              disabled={false}
          />
        <InfiniteScroll
                            dataLength={characters.edges.length}
                            next={fetchMoreCharacterData}
                            hasMore={characters.pageInfo.hasNextPage}
                            loader={<PropagateLoader
                                color={'var(--black-a4)'}
                                loading={true}
                                cssOverride={{
                                    display: "flex",
                                    justifyContent:'center',
                                    width:'100%',
                                    height:20,
                                    alignItems:'center',
                                }}
                                size={13}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                                />}
                            endMessage={<></>
                                // <p style={{ textAlign: "center" }}>Yay! You have seen it all</p>
                            }
                        >
            <div className='character_list'>
                {
                    characters.edges.map(({role,node,voiceActors},index)=>
                    <div className='character_content_wrapper' key={index}>
                            < ImageComponent
                                src={node.image.large} alt={"Character Image"} 
                            />
                            <div className='character_det_wrapper flex'>
                                <div className="char_act_name">
                                    <div>{node.name.full}</div>
                                    <div className='text_left'>{voiceActors[0]?.name.full}</div>
                                </div>
                                <div className="role_language">
                                    <div>{TitleCase(role)}</div>
                                    <div className='text_left'>{voiceActors[0]?.languageV2}</div>
                                </div>
                            </div>
                        {!!voiceActors.length>0 && <ImageComponent 
                                src={voiceActors[0].image.large} alt={"Actor Image" }
                            />}
                    </div>
                    )
                }
            </div>
        </InfiniteScroll>
        </>
  )
}

export {CharactersTab,ImageComponent}
