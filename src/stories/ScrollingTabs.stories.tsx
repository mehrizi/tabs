import type { Meta, StoryObj } from '@storybook/react';

import { ScrollingTabs, Tab, TabContext, Tabs } from '../Components';
import { generateTabData } from '../helpers';
import { LoremIpsum } from 'lorem-ipsum';

const meta: Meta<typeof ScrollingTabs> = {
  component: ScrollingTabs,
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
    <div>
      <div style={{ paddingBottom: 15,textAlign:'center' }}>
        <b>This area is intentionally put so you can see the sticky behavior of Tabs.<br />
          At the End we put some space as well to illustrate relative stickyness.<br />
        </b>
        {(new LoremIpsum()).generateParagraphs(3)}

      </div>

      <div style={{ width: 700, margin: '0 auto', border: '1px solid grey', borderRadius: 10, padding: 10 }}>
        <ScrollingTabs {...args} >
          <Tabs>
            {arr.map(i => <Tab key={i}>{generateTabData(i).title}</Tab>)}
          </Tabs>
          {arr.map(i => <TabContext key={i}>{generateTabData(i).text}</TabContext>)}
        </ScrollingTabs>

      </div>
      <div style={{ paddingTop: 15,textAlign:'center' }}>
        <b>This area is intentionally put so you can see the sticky behavior of Tabs.<br />
          At the End we put some space as well to illustrate relative stickyness.<br />
        </b>
        {(new LoremIpsum()).generateParagraphs(15)}

      </div>

    </div>
  )

};
const arr = [1, 2, 3, 4, 5, 6, 7]