// import { ScrollingTabs, Tab, TabContext, Tabs } from "scrolling-tabs";
import { useState } from "react";
import { ScrollingTabs, Tab, TabContext, Tabs } from "./Components";
import { generateTabData } from "./helpers";

function App() {
  let tabs: any[] = []
  const [show,setShow] = useState(false)
  for (let i = 0; i <= 6; i++)
    tabs[i] = generateTabData(i + 1)

  return (
    <div dir="rtl">
      <h1>React Scrolling Tabs</h1>
      <div style={{ height: 300, }}></div>

      <div style={{ width: 250, margin: '0 auto' }}>
        <button onClick={()=>setShow(!show)}>show/hide</button>

        <ScrollingTabs tabStyle="contained">
          asdf asdf asdf
          <Tabs>
            {tabs.map((tab, index) => <Tab key={index}>{tab.title}</Tab>)}
            {show&&<Tab>Last tab</Tab>}

asdf asdfasdf asdf sadf asd

          </Tabs>

saf asdf asd
          {tabs.map((tab, index) => <TabContext key={index}>{tab.text}</TabContext>)}
          {show&&<TabContext>Last tab</TabContext>}
          This is some thing
        </ScrollingTabs>
      </div>
      <br />
      <br />
      {tabs[0].text}
      {tabs[0].text}
      {tabs[0].text}
      {tabs[0].text}
      {tabs[0].text}
      {tabs[0].text}
      {tabs[0].text}
      {tabs[0].text}

    </div>
  );
}

export default App;
