import React from 'react';
import {Divider, Paper, Tab, Tabs, Typography} from "@material-ui/core";
import {Comment} from "../Comment";
import {AddCommentForm} from "../AddCommentForm";
import data from '../../data';
import { CommentItem } from '../../utils/api/types';
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user';
import {Api} from "../../utils/api";


interface PostComments {
    postId: number;
}

export const PostComments: React.FC<PostComments> = ({ postId }) => {
    const userData = useAppSelector(selectUserData);
    const [activeTab, setActiveTab] = React.useState(0);
    const [comments, setComments] = React.useState<CommentItem[]>([]);
    // const comments = data.comments[activeTab === 0 ? 'popular' : 'new'];

    const onAddComment = (obj: CommentItem) => {
        setComments((prev) => [...prev, obj]);
    };

    const onRemoveComment = (id: number) => {
        setComments((prev) => prev.filter((obj) => obj.id !== id));
    };

    React.useEffect(() => {
        (async () => {
            try {
                const arr = await Api().comment.getAll(postId);
                setComments(arr)
            } catch (err) {
                console.warn('Fetch comments', err)
            }
        }) ();
    }, []);

    return (
        <Paper elevation={0} className="mt-40 p-30">
            <div className="container">
                <Typography variant="h6" className="mb-20">
                    42 комментария
                </Typography>
                <Tabs
                    onChange={(_, newValue) => setActiveTab(newValue)}
                    className="mt-20"
                    value={activeTab}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab label="Популярные" />
                    <Tab label="По порядку" />
                </Tabs>
                <Divider />
                {userData && <AddCommentForm onSuccessAdd={onAddComment} postId={postId} />}
                <div className="mb-20" />
                {comments.map((obj) => (
                    <Comment
                        key={obj.id}
                        id={obj.id}
                        user={obj.user}
                        text={obj.text}
                        createdAt={obj.createdAt}
                        currentUserId={userData?.id}
                        onRemove={onRemoveComment}
                    />
                ))}
            </div>
        </Paper>
    );
};