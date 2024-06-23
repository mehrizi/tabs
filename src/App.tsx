import { ScrollingTabs } from "./Components/ScrollingTabs";
import { Tab } from "./Components/Tab";
import { TabContext } from "./Components/TabContext";
import { Tabs } from "./Components/Tabs";

function App() {
  let tabs = [
    {title:<div>Some title</div>,text:<div>asdf asfd asf asfd asdf<br/>asdf asfd asf asfd asdf<br/>asdf asfd asf asfd asdf<br/>asdf asfd asf asfd asdf<br/>asdf asfd asf asfd asdf<br/>asdf asfd asf asfd asdf<br/>asdf asfd asf asfd asdf<br/>asdf asfd asf asfd asdf<br/>asdf asfd asf asfd asdf<br/></div>}
  ];
  tabs[1] = {...tabs[0]}
  tabs[2] = {...tabs[0]}
  tabs[3] = {...tabs[0]}
  tabs[4] = {...tabs[0]}
  return (
    <>
      <h1>React Scrolling Tabs</h1>
      <div style={{ width: "300px" }}>
        <ScrollingTabs>
          <Tabs>
            {tabs.map((tab,index)=><Tab key={index}>{tab.title}</Tab>)}
          </Tabs>
          {tabs.map((tab,index)=><TabContext key={index}>{tab.text}</TabContext>)}
        </ScrollingTabs>
        
      </div>
    </>
  );
}

export default App;
