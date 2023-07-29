import PicSeqEditor from '@/components/PicSeqEditor.vue';
import PicImageEditor from '@/components/PicImageEditor.vue';

export const routes = [
    { path: '/seq-editor', name: 'picSeqEditor', component: PicSeqEditor },
    { path: '/image-editor', name: 'picImageEditor', component: PicImageEditor }
];
