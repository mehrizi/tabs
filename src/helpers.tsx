import { LoremIpsum } from "lorem-ipsum";

export function generateTabData(index = 1) {
    return {
      title: `Tab (${index})`,
      text: <>
        <h2>This is the ({index}) heading</h2>
        {(new LoremIpsum()).generateParagraphs(Math.ceil(Math.random() * 15))}
      </>
  
    }
  }
  