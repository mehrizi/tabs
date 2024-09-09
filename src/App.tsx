// import { ScrollingTabs, Tab, TabContext, Tabs } from "scrolling-tabs";
import { ScrollingTabs, Tab, TabContext, Tabs } from "./Components";
import { generateTabData } from "./helpers";

function App() {
  let tabs: any[] = []
  for (let i = 0; i <= 6; i++)
    tabs[i] = generateTabData(i + 1)

  return (
    <>
      <h1>React Scrolling Tabs</h1>
      <div style={{ height: 300 }}></div>

      <ScrollingTabs tabStyle="contained">
        <Tabs>
          {tabs.map((tab, index) => <Tab key={index}>{tab.title}</Tab>)}
          
        </Tabs>


        {tabs.map((tab, index) => <TabContext key={index}>{tab.text}</TabContext>)}
      </ScrollingTabs>
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

    </>
  );
}

export default App;
