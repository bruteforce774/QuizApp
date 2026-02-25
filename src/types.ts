export interface Question {
  _id?: string;
  topic: "general" | (string & {})
  question: string;
  answer: string
}
