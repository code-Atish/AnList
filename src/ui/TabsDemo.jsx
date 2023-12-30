import React, { useRef, useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import '../details.css'
import { PropagateLoader } from 'react-spinners';
import Relations from './overViewTab/Relations';
import ExtLinks from './overViewTab/ExtLinks';
import Recommendations from './overViewTab/Recommendations';
import WatchTab from './WatchTab/WatchTab';
import {CharactersTab} from './CharactersTab/CharactersTab';
import StaffTab from './StaffTab/StaffTab';
import SelectDemo from './SelectDemo';
import { useQuery } from '@apollo/client';
import { getCharacterDetails } from '../queries/queries';


const TabsDemo = ({Data:data,fetchMoreData,hasMore,recommendations,
    setHasMore,fetchMoreStaffData,updateLanguage}) =>{
    
  return (
      <Tabs.Root className="TabsRoot" defaultValue="tab1">
        <Tabs.List className="TabsList" aria-label="Manage your account">
          <Tabs.Trigger className="TabsTrigger" value="tab1">
            Overview
          </Tabs.Trigger>
          {data.streamingEpisodes.length>0 && <Tabs.Trigger className="TabsTrigger" value="tab2">
            Watch
          </Tabs.Trigger>}
          {data.characters.edges.length>0 && <Tabs.Trigger className="TabsTrigger" value="tab3">
            Characters
          </Tabs.Trigger>}
          {data.characters.edges.length>0 && <Tabs.Trigger className="TabsTrigger" value="tab4">
            Staff
          </Tabs.Trigger>}
        </Tabs.List>
        <Tabs.Content className="TabsContent" value="tab1">
            { data.relations.edges.length>0 && 
              <Relations 
                  relations={data.relations.edges}
              />
            }
            { data.externalLinks.length>0 && 
              <ExtLinks  
                  externalLinks={data.externalLinks}
              />
            }
            <Recommendations 
                    recommendations={recommendations} 
                    fetchMoreData={fetchMoreData} 
                    hasMore={hasMore} 
                    setHasMore={setHasMore}       
            />
        </Tabs.Content>
        <Tabs.Content className="TabsContent" value="tab2">
          <WatchTab data={data} />
        </Tabs.Content>

        <Tabs.Content className="TabsContent" value="tab3">
          
          <CharactersTab 
                id={data.id}
                characters={''} 
                // fetchMoreCharacterData={fetchMoreCharacterData}
                // state={state}
                // loading={loading}
                // error={error}
          />
        </Tabs.Content>

        <Tabs.Content className="TabsContent" value="tab4">
          <StaffTab 
                staff={data.staff} 
                fetchMoreStaffData={fetchMoreStaffData}
          />
            {/* <PropagateLoader
              color={'var(--black-a4)'}
              loading={true}
              cssOverride={{
                display: "flex",
                marginTop:'1em',
                justifyContent:'center',
                width:'100%',          
              }}
              size={13}
              aria-label="Loading Spinner"
              data-testid="loader"
            /> */}
          </Tabs.Content>         
            <Tabs.Content className="TabsContent" value="tab5">
              <p className="Text">Change your password here. After saving, you'll be logged out.</p>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="currentPassword">
                  Current password
                </label>
                <input className="Input" id="currentPassword" type="password" />
              </fieldset>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="newPassword">
                  New password
                </label>
                <input className="Input" id="newPassword" type="password" />
              </fieldset>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="confirmPassword">
                  Confirm password
                </label>
                <input className="Input" id="confirmPassword" type="password" />
              </fieldset>
              <div style={{ display: 'flex', marginTop: 20, justifyContent: 'flex-end' }}>
                <button className="Button green">Change password</button>
              </div>
            </Tabs.Content>
      </Tabs.Root>
    );
}

export default TabsDemo;