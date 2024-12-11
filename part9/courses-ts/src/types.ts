interface CoursePartsBase {
  name: string,
  exerciseCount: number,
}

interface CourseBasicDescription extends CoursePartsBase {
  description: string
}

interface CoursePartBasic extends CourseBasicDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartsBase {
  groupProjectCount: number,
  kind: "group"
}

interface CoursePartBackground extends CourseBasicDescription {
  backgroundMaterial: string,
  kind: "background"
}

interface CoursePartWithSpecial extends CourseBasicDescription {
  requirements: string[],
  kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartWithSpecial;
