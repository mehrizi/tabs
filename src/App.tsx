import { ScrollingTabs } from "./Components/ScrollingTabs";
import { Tab } from "./Components/Tab";
import { TabContext } from "./Components/TabContext";
import { Tabs } from "./Components/Tabs";
import { LoremIpsum } from "lorem-ipsum";

function generateTabData(index = 1) {
  return {
    title: `Tab (${index})`,
    text: <>
      <h2>This is the ({index}) heading</h2>
      {(new LoremIpsum()).generateParagraphs(Math.ceil(Math.random() * 15))}
    </>

  }
}
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
