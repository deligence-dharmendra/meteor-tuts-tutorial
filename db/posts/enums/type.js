// Define enum type
const PostTypeEnum = {
    NATURE: 'Nature',
    PSYCHOLOGY: 'Psychology',
    MUSIC: 'Music',
    PROGRAMING: 'Programming',
    PROJECT_MANAGEMENT: 'Project Management',
    OTHER: 'Other'
}
// Maybe you want to have them used as human readable
const PostTypeLabels = {
    [PostTypeEnum.NATURE]: 'Nature',
    [PostTypeEnum.PHILOSOPHY]: 'Philosophy',
    [PostTypeEnum.MUSIC]: 'Music',
    [PostTypeEnum.PROGRAMING]: 'Programming',
    [PostTypeEnum.PROJECT_MANAGEMENT]: 'Project Management',
    [PostTypeEnum.OTHER]: 'Other'
}
export default PostTypeEnum;
export {
    PostTypeEnum,
    PostTypeLabels
}