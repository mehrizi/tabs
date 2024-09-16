import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';
import Markdown from 'react-markdown';
import { ScrollingTabs, Tab, TabContext, Tabs } from '../Components';


interface ParsedSection {
  title: string;
  markup: string;
}

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
  render: (args) => {
    const [readme, setReadme] = useState<ParsedSection[]>([])
    async function fetchFileContent() {
      let fileUrl = '';

      // Check if we're in production (built Storybook) or development
      if (process.env.NODE_ENV === 'production') {
        // In build mode, use the bundled file path (static assets)
        fileUrl = '/README.md'; // Served from static assets
      } else {
        // In development mode, use the Vite plugin's API
        fileUrl = '/api/readme';
      }

      const response = await fetch(fileUrl);
      const content = await response.text();
      // console.log(content); // Process the parsed file content
      setReadme(parseReadme(content))

    }

    const parseReadme = (text: string): ParsedSection[] => {
      if (text == '')
        return [];
      const lines = text.split('\n');
      const sections: ParsedSection[] = [];

      let currentTitle = '';
      let currentMarkup = '';

      for (const line of lines) {
        if (line.startsWith('## ')) {
          // If there's an existing section, push it to the result array
          if (currentTitle) {
            sections.push({
              title: currentTitle.replace(/^##\s*/, '').trim(),
              markup: currentMarkup.trim(),
            });
          }

          // Start a new section
          currentTitle = line.trim(); // Store the title (## Heading)
          currentMarkup = line + '\n'; // Include the heading in the markup
        } else if (currentTitle) {
          // Add line to the current section markup
          currentMarkup += line + '\n';
        }
      }

      // Push the last section
      if (currentTitle) {
        sections.push({
          title: currentTitle.replace(/^##\s*/, '').trim(),
          markup: currentMarkup.trim(),
        });
      }

      return sections;
    }


    fetchFileContent();
    return (
      <div style={{ color: '#444' }}>
        <div style={{ padding: '100px 0', textAlign: 'center' }}>
          This area is intentionally put so you can see the sticky behavior of Tabs.<br />
          At the End I put some space as well to illustrate relative stickyness.<br />

        </div>

        <div style={{ width: 700, margin: '0 auto', border: '1px solid #ccc', borderRadius: 10, padding: 10, lineHeight: 1.5 }}>
          <ScrollingTabs {...args} >
            <Tabs>
              {readme.map((section, index) => <Tab key={index}>{section.title}</Tab>)}
            </Tabs>

            {readme.map((section, index) => <TabContext key={index}>
              <Markdown>
                {section.markup}
              </Markdown>
            </TabContext>)}

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

const arr = [8, 9, 10, 11]