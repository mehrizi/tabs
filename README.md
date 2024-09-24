## Overview
[Interactive Demo & Docs](https://mehrizi.github.io/scrolling-tabs/)

[Github Repo](https://github.com/mehrizi/scrolling-tabs)

This is a component for creating scrolling tabs. Objectives are:

- Automatically scroll to a section by clicking on its respective tab button.
- Automatically highlight a tab button when the corresponding section is scrolled into view.
- Simple predefined styles that are easily customizable.

---

## Installation

### Peer Dependencies
As this is a React component, you must have already installed `react` and `react-dom`.

The other peer dependency can be installed via the following command:

```bash
npm install react-draggable
```

Detailed version requirements for all dependencies:

- react >= 16.3.0
- react-dom >= 16.3.0
- react-draggable >= 4.0


### Installing
After dependency installation, run the following command to install the package:

```bash
npm install scrolling-tabs
```
## Component Structure
There are 4 components which should be structured as follows:

```jsx
<ScrollingTabs>
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
</ScrollingTabs>
```

## RTL
The component checks for the direction of the component, and if it is inside an RTL context (e.g., parent elements with `dir='rtl'`), it will render with RTL features.

You can set `dir='rtl'` on the document body or any parent of the `<ScrollingTabs>` component.

## Customization
Aside from the tabColor and tabStyle props on the `<ScrollingTabs>` component, you can customize it by passing className and style props to `<Tabs>`, `<Tab>`, or `<TabContext>`.

The `<Tab>` component will have an active class on the selected tab. It also has two extra props: activeStyle and activeClassName, which are set only for the active tab.

Based on tabStyle and tabColor props, styles are composed in the following order:

### For any Tab:
- Default styles based on tabStyle.
- Styles provided through style prop on the Tab component.

### For the active Tab:
- Default styles based on tabStyle.
- Default active styles based on tabStyle.
- Styles provided through style prop on the Tab component.
- Styles provided through activeStyle prop on the Tab component.

Even with tabStyle set to none, the following styles are applied to avoid bad tab display:

```css
{
  display: 'inline-block',
  padding-right: 15px,
  padding-left: 15px,
  margin-right: 5px,
  margin-left: 5px,
  transition: 'all .5s',
  cursor: 'pointer'
}
```

## Responsivity
The component is responsive and will automatically scroll horizontally to the selected tab on smaller screens. If the `<Tabs>` component is wider than the screen, it will scroll horizontally to show all tabs.

Two arrows are displayed in the rightmost and leftmost spaces of the horizontal tabs bar. These can be removed by setting the boolean hideArrows prop to true.

## Troubleshooting
If any parent element has `overflow: hidden`, the CSS sticky position will not work. Instead, use `overflow: clip`.

If you have any issue, please feel free to submit an issue at 
[https://github.com/mehrizi/tabs/issues](https://github.com/mehrizi/tabs/issues)