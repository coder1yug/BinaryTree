document.addEventListener('DOMContentLoaded', () => {
  const topicInput = document.getElementById('topic-input');
  const addTopicBtn = document.getElementById('add-topic-btn');
  const discussionContainer = document.getElementById('discussion-topics');

  // Load existing topics from localStorage
  const topics = JSON.parse(localStorage.getItem('discussion-topics')) || [];

  // Render all topics
  topics.forEach(renderTopic);

  // Add new topic
  addTopicBtn.addEventListener('click', () => {
    const title = topicInput.value.trim();
    if (!title) return;

    const newTopic = {
      id: Date.now(),
      title,
      responses: []
    };

    topics.push(newTopic);
    saveTopics();
    renderTopic(newTopic);
    topicInput.value = '';
  });

  function renderTopic(topic) {
    const topicDiv = document.createElement('div');
    topicDiv.className = 'topic';

    const title = document.createElement('div');
    title.className = 'topic-title';
    title.textContent = topic.title;

    const responseList = document.createElement('div');
    responseList.className = 'topic-responses';

    topic.responses.forEach(resp => {
      const responseDiv = document.createElement('div');
      responseDiv.className = 'response';
      responseDiv.textContent = resp;
      responseList.appendChild(responseDiv);
    });

    const responseBox = document.createElement('textarea');
    responseBox.placeholder = 'Reply to this topic...';

    const postBtn = document.createElement('button');
    postBtn.textContent = 'Post';

    postBtn.addEventListener('click', () => {
      const text = responseBox.value.trim();
      if (!text) return;

      topic.responses.push(text);
      saveTopics();

      const newResp = document.createElement('div');
      newResp.className = 'response';
      newResp.textContent = text;
      responseList.appendChild(newResp);

      responseBox.value = '';
    });

    const responseInputDiv = document.createElement('div');
    responseInputDiv.className = 'response-input';
    responseInputDiv.appendChild(responseBox);
    responseInputDiv.appendChild(postBtn);

    topicDiv.appendChild(title);
    topicDiv.appendChild(responseList);
    topicDiv.appendChild(responseInputDiv);

    discussionContainer.appendChild(topicDiv);
  }

  function saveTopics() {
    localStorage.setItem('discussion-topics', JSON.stringify(topics));
  }
});
