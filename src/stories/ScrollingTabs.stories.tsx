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
  render: (args) => (
    <div style={{fontFamily:'"Nunito Sans", -apple-system, ".SFNSText-Regular", "San Francisco", BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif'}}>
      {(new LoremIpsum()).generateParagraphs(3)}
      <div style={{ width: 700, margin: '0 auto' }}>
        <ScrollingTabs {...args} >
          <Tabs>
            {arr.map(i => <Tab>{generateTabData(i).title}</Tab>)}
          </Tabs>
          {arr.map(i => <TabContext>{generateTabData(i).text}</TabContext>)}
        </ScrollingTabs>

      </div>

    </div>
  )

};
const arr = [1, 2, 3, 4, 5, 6, 7, 8]