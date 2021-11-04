const Queries = [
    {
        name: "For basic server response/info",
        query: `query info {
                info
            }`,
    },
    {
        name: "For fragment in GraphQL",
        query: `query userNposts ($userId: ID!) {
                user(userId: $userId) { ...userFragment }
                posts { ...postsUserFragment }
            }
            fragment userFragment on User {
                name
                id
                username
                email
                phone
                ...websiteUserFragment
                posts { ...postsUserFragment }
            }
            fragment websiteUserFragment on User { website }
            fragment postsUserFragment on Post {
                postId
                userId
                title
                body
                comments {
                    commentId
                    postId
                    name
                    email
                    body
                }
            }`,
        variables: {
            userId: "10",
        },
    },
];

export default Queries;
