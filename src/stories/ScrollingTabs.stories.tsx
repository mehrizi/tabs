import type { Meta, StoryObj } from '@storybook/react';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { cb } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { ScrollingTabs, Tab, TabContext, Tabs } from '../Components';
import { generateTabData } from '../helpers';
import { InlineCode } from './helpers';
const meta: Meta<typeof ScrollingTabs> = {
  component: ScrollingTabs,
  // tags: ['autodocs'],

};

export default meta;
type Story = StoryObj<typeof ScrollingTabs>;

export const Primary: Story = {
  args: {
    tabStyle: 'contained',
    tabColor: '#f00',
  },
  argTypes: {

    children: {
      table: {
        disable: true,
      },
    }
  },
  render: (args) => {
    return (
      <div style={{ color: '#444' }}>
        <div style={{ padding: '100px 0', textAlign: 'center' }}>
          This area is intentionally put so you can see the sticky behavior of Tabs.<br />
          At the End I put some space as well to illustrate relative stickyness.<br />


        </div>

        <div style={{ width: 700, margin: '0 auto', border: '1px solid #ccc', borderRadius: 10, padding: 10, lineHeight: 1.5 }}>
          <ScrollingTabs {...args} >
            <Tabs>
              <Tab>Overview</Tab>
              <Tab>Installation</Tab>
              <Tab>Component structure</Tab>
              <Tab>RTL</Tab>
              <Tab>Customization</Tab>
              <Tab>Responsivity</Tab>
              <Tab>TroubleShoot</Tab>
              {arr.map(i => <Tab key={i}>{generateTabData(i).title}</Tab>)}
            </Tabs>

            <TabContext>
              <h2>Overview</h2>
              This is a Reactjs component for creating scrolling tabs. Objectives are:

              <ul>
                <li>Automatically scroll to a TabContext by clicking on its respective Tab button. </li>
                <li>Automatically highlighting a Tab button when the corresponding TabContext is scrolled into view.</li>
                <li>Simple predefined styles which are easily customizable</li>
              </ul>
            </TabContext>
            <br />
            <TabContext>
              <h2>Installation</h2>
              <h3>Peer Dependencies</h3>
              As this is a React component you must have already installed <code>react</code> and <code>react-dom</code>.
              <br />
              The other peer dependency can be installed via following command:
              <br />
              <InlineCode cmd>npm install react-draggable</InlineCode>
              <br />
              Followings are detailed version requirements for all Dependencies:
              <ul>
                <li>{`react >= 16.3.0`}</li>
                <li>{`react-dom >=16.3.0`}</li>
                <li>{`react-draggable >=4.0`}</li>
              </ul>
              <h3>Installing</h3>
              After dependency Installation the following will simply install the package:
              <InlineCode cmd>npm install scrolling-tabs</InlineCode>
            </TabContext>
            <br />
            <TabContext>
              <h2>Component Structure</h2>
              There are 4 components which you should structure as following:

              <SyntaxHighlighter
                language='jsx'
                style={cb}
              >
                {`<ScrollingTabs>
  <Tabs>
    <Tab>First Tab</Tab>
    <Tab>Second Tab</Tab>
    ...
  </Tabs>

  <TabContext>
    First Tab context
  </TabContext>
  <TabContext>
    Second Tab context
  </TabContext>
  ...
</ScrollingTabs>`
                }
              </SyntaxHighlighter>
            </TabContext>
            <br />
            <TabContext>
              <h2>RTL</h2>
              The component checks for the direction of the component and if it is inside an RTL context (parents with RTL direction)
              it renders with rtl features. You can set <InlineCode>`dir='rtl'`</InlineCode> on document body or any parent of <InlineCode>{`<ScrollingTabs>`}</InlineCode> component.
              <br />

              To check it in action you can choose RTL from left panel.
            </TabContext>
            <br />
            <TabContext>
              <h2>Customization</h2>
              Aside from <InlineCode>tabColor</InlineCode> and <InlineCode>tabStyle</InlineCode> on <InlineCode>{`<ScrollingTabs>`}</InlineCode> component, you can customize the component by passing
              <InlineCode>className</InlineCode> and <InlineCode>style</InlineCode> props to <InlineCode>{`<Tabs>`}</InlineCode>, <InlineCode>{`<Tab>`}</InlineCode>
              or <InlineCode>{`<TabContext>`}</InlineCode> component.
              <br />
              <InlineCode>Tab</InlineCode> component will have a <InlineCode>active</InlineCode> class on the selected tab. This componeny has two extra
              props: <InlineCode>activeStyle</InlineCode> and <InlineCode>activeClassName</InlineCode> which are set only for the active tab.
              <br />
              Based on <InlineCode>tabStyle</InlineCode> and <InlineCode>tabColor</InlineCode> props styles are composed in the following order:
              <h3>For any Tab</h3>
              <ul>
                <li>Default styles based on <InlineCode>tabStyle</InlineCode></li>
                <li>Styles provided through <InlineCode>style</InlineCode> on Tab component</li>
              </ul>
              <h3>For active Tab</h3>
              <ul>
                <li>Default styles based on <InlineCode>tabStyle</InlineCode></li>
                <li>Default active styles based on <InlineCode>tabStyle</InlineCode></li>
                <li>Styles provided through <InlineCode>style</InlineCode> on Tab component</li>
                <li>Styles provided through <InlineCode>activeStyle</InlineCode> on Tab component</li>
              </ul>
              <br />
              Even in case of <InlineCode>none</InlineCode> as the tabStyle the following styles are applied to avoid bad tabs display:
              <SyntaxHighlighter
                language='css'
                style={cb}
              >
                {`{
  display: 'inline-block',
  paddingRight: 15,
  paddingLeft: 15,
  marginRight: 5,
  marginLeft: 5,
  transition: 'all .5s',
  cursor: 'pointer'
}`}
              </SyntaxHighlighter>
            </TabContext>
            <br />
            <TabContext>
              <h2>Responsivity</h2>
              The component is responsive and will automatically scroll horizontally to the selected tab on smaller screens.
              In case that <InlineCode>Tabs</InlineCode> component is wider than the screen, it will scroll horizontally to show all tabs.
              <br />
              Two arrows are displayed in rightmost or leftmost space of horizonal Tabs bar which you can remove totally by boolean
              <InlineCode>hideArrows</InlineCode> prop.
            </TabContext>
            <TabContext>
              <h2>Troubleshoot</h2>
              <ul>
                <li>
                  If any decendent parent has <code>hidden</code> overflow, the CSS sticky position would not work. Instead use overflow:clip
                </li>
              </ul>
            </TabContext>
            {arr.map(i => <TabContext key={i}>{generateTabData(i).text}</TabContext>)}
          </ScrollingTabs>

        </div>
        <div style={{ padding: '200px 0', textAlign: 'center' }}>
          This area is intentionally put so you can see the sticky behavior of Tabs.<br />
          At the End we put some space as well to illustrate relative stickyness.<br />

        </div>

      </div>
    )
  }

};
export const RTL: Story = {
  ...Primary,
  decorators: [
    (Story) => (
      <div dir='rtl'>
        <Story />
      </div>
    ),
  ],
};

const arr = [8,9,10,11]