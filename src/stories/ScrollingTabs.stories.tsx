import type { Meta, StoryObj } from '@storybook/react';

import { ScrollingTabs, Tab, TabContext, Tabs } from '../Components';
import { generateTabData } from '../helpers';
import { LoremIpsum } from 'lorem-ipsum';

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
  render: (args) => (
    <div style={{color:'#444'}}>
      <div style={{ padding: '100px 0',textAlign:'center' }}>
        This area is intentionally put so you can see the sticky behavior of Tabs.<br />
          At the End we put some space as well to illustrate relative stickyness.<br />
        
        
      </div>

      <div style={{ width: 700, margin: '0 auto', border: '1px solid #ccc', borderRadius: 10, padding: 10,lineHeight:1.5 }}>
        <ScrollingTabs {...args} className=''>
          <Tabs>
            <Tab>Installation</Tab>
            {arr.map(i => <Tab key={i}>{generateTabData(i+3).title}</Tab>)}
          </Tabs>
          <TabContext>
            <pre>
              <ScrollingTabs>
                <Tabs>
                  <Tab>Tab 1</Tab>
                </Tabs>
              </ScrollingTabs>
            </pre>
          </TabContext>
          {arr.map(i => <TabContext key={i}>{generateTabData(i+3).text}</TabContext>)}
        </ScrollingTabs>

      </div>
      <div style={{ padding: '200px 0',textAlign:'center' }}>
        This area is intentionally put so you can see the sticky behavior of Tabs.<br />
          At the End we put some space as well to illustrate relative stickyness.<br />
        
      </div>

    </div>
  )

};
const arr = [1, 2, 3, 4, 5, 6, 7]