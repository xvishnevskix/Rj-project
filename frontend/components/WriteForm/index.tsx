import React from 'react';
import {Button, Input} from "@material-ui/core";
import styles from './WriteForm.module.scss';
import dynamic from "next/dynamic";
import {Api} from "../../utils/api";

const Editor = dynamic(() => import('../Editor').then(m => m.Editor), { ssr: false })

interface WriteFormProps {
    title?: string;
}

export const WriteForm: React.FC<WriteFormProps> = () => {
    const [title, setTitle] = React.useState('')
    const [blocks, setBlocks] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)

    const onAddPost = async ()  => {
        try {
            setIsLoading(true);
            const post = await Api().post.create({
                title,
               body: blocks,
            });
            console.log()
        } catch (e) {
            console.warn('Create post', e)
            alert(e)
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <div>
            <Input
                value={title}
                onChange={e => setTitle(e.target.value)}
                classes={{ root: styles.titleField }}
                placeholder="Заголовок"
                defaultValue={title} />
            <div className={styles.editor}>
                <Editor onChange={arr => setBlocks(arr)}/>
            </div>
            <Button  onClick={onAddPost} variant="contained" color="primary">
                Опубликовать
            </Button>
        </div>
    );
};
