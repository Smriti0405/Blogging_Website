const mongoose = require('mongoose');
const Blog = require('./model/blog');


mongoose.connect('mongodb://127.0.0.1:27017/blogdb')
.then(()=> console.log('Database Connected'))
.catch((err)=> console.log(err));


const blogs = [
    {
        title:'Next-Gen Technology: ChatGPT',
        img:'https://images.unsplash.com/photo-1678483789107-0029c61fdcca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2hhdCUyMGdwdHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        content:`ChatGPT (Chat Generative Pre-trained Transformer) is a chatbot launched by OpenAI in November 2022. 
        It is built on top of OpenAI's GPT-3 family of large language models, and is fine-tuned 
        (an approach to transfer learning) with both supervised and reinforcement learning techniques.
        ChatGPT was launched as a prototype on November 30, 2022, and quickly garnered attention for its 
        detailed responses and articulate answers across many domains of knowledge. Its uneven factual accuracy 
        was identified as a significant drawback. Following the release of ChatGPT, OpenAI was valued at $29 
        billion.ChatGPT was fine-tuned on top of GPT-3.5 using supervised learning as well as reinforcement learning. 
        Both approaches used human trainers to improve the model's performance. In the case of supervised learning, 
        the model was provided with conversations in which the trainers played both sides: the user and the AI assistant. In the 
        reinforcement step, human trainers first ranked responses that the model had created in a previous conversation. These rankings were used to 
        create 'reward models' that the model was further fine-tuned on using several iterations of Proximal 
        Policy Optimization (PPO). Proximal Policy Optimization algorithms present a cost-effective benefit 
        to trust region policy optimization algorithms; they negate many of the computationally expensive 
        operations with faster performance. The models were trained in collaboration with Microsoft on their 
        Azure supercomputing infrastructure.`,
        author:'Vani Srivastava'
    },
    {
        title:'There is no friend as loyal as a book',
        img:'https://images.unsplash.com/photo-1505489304219-85ce17010209?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9vayUyMGFyZSUyMGZyaWVuZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
        content:`Books are the best companions of human beings, which enrich our minds with knowledge. 
        Reading good books can help you change your perspective of looking at the world. They also help us to 
        positively look at things and enhance our imagination and thinking skills. Reading books also helps us 
        increase our vocabulary. We get to learn about the different places on the earth from the books we read. Books 
        can help people grow mentally by teaching them new and intriguing knowledge about the world. People learn about good and bad 
        deeds, positive and negative things, from books. There are various types of books, of which novels, short stories, drama, poetry and autobiographies are a few. 
        There are a lot of motivational and inspiring books which can motivate people and change their lives.`,
        author:'Smriti Singh'
    }

];

Blog.insertMany(blogs)
.then(()=>console.log('Product Seeded'));