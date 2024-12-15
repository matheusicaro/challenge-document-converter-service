/**
 * A segment contains a name/key and the respective elements that define a segment
 */
export type Segment = {
  name: string;
  elements: string[];
};

/**
 * DomainFile is a type of document of transport through the app domain
 *
 *  @content - the document file content parsed as a Segment
 *  @separators - the separator chars for the segment and elements from content
 */
export interface DomainFile {
  content: Segment[];
  separators: {
    bySegment: string;
    byElement: string;
  };
}
