export interface Skill {
    name: string,
    description: string 
}

export interface SkillWithScaling extends Skill {
    scaling: string[][]
}