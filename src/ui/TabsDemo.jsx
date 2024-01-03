import React, { useContext, useRef, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import "../details.css";
import Relations from "./overViewTab/Relations";
import ExtLinks from "./overViewTab/ExtLinks";
import Recommendations from "./overViewTab/Recommendations";
import WatchTab from "./WatchTab/WatchTab";
import { CharactersTab } from "./CharactersTab/CharactersTab";
import StaffTab from "./StaffTab/StaffTab";
import { MyContext } from "../Details";

const TabsDemo = () => {
  const { data } = useContext(MyContext);
  return (
    <Tabs.Root className="TabsRoot" defaultValue="tab1">
      <Tabs.List className="TabsList" aria-label="Manage your account">
        <Tabs.Trigger className="TabsTrigger" value="tab1">
          Overview
        </Tabs.Trigger>
        {data.streamingEpisodes.length > 0 && (
          <Tabs.Trigger className="TabsTrigger" value="tab2">
            Watch
          </Tabs.Trigger>
        )}
        {data.characters.edges.length > 0 && (
          <Tabs.Trigger className="TabsTrigger" value="tab3">
            Characters
          </Tabs.Trigger>
        )}
        {data.characters.edges.length > 0 && (
          <Tabs.Trigger className="TabsTrigger" value="tab4">
            Staff
          </Tabs.Trigger>
        )}
      </Tabs.List>

      <Tabs.Content className="TabsContent" value="tab1">
        {data.relations.edges.length > 0 && <Relations />}
        {data.externalLinks.length > 0 && <ExtLinks />}
        <Recommendations />
      </Tabs.Content>
      <Tabs.Content className="TabsContent" value="tab2">
        <WatchTab data={data} />
      </Tabs.Content>

      <Tabs.Content className="TabsContent" value="tab3">
        <CharactersTab id={data.id} />
      </Tabs.Content>

      <Tabs.Content className="TabsContent" value="tab4">
        <StaffTab />
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default TabsDemo;
