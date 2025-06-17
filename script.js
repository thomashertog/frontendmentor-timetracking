document.getElementById('switch-daily').addEventListener('click', function() {
    document.querySelector('[data-current]').attributes['data-current'].value = 'daily';
    document.querySelector('[aria-pressed=true]').setAttribute('aria-pressed', false);
    this.setAttribute('aria-pressed', true);
});
document.getElementById('switch-weekly').addEventListener('click', function() {
    document.querySelector('[data-current]').attributes['data-current'].value = 'weekly';
    document.querySelector('[aria-pressed=true]').setAttribute('aria-pressed', false);
    this.setAttribute('aria-pressed', true);
});
document.getElementById('switch-monthly').addEventListener('click', function() {
    document.querySelector('[data-current]').attributes['data-current'].value = 'monthly';
    document.querySelector('[aria-pressed=true]').setAttribute('aria-pressed', false);
    this.setAttribute('aria-pressed', true);
});

fetch('data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }).then(data => {
    const container = document.getElementById('report');
    const template = document.getElementById('time-entry-template');

    data.forEach(item => {
      const itemTemplate = template.content.cloneNode(true);
      const itemTitle = item.title.toLowerCase().replace(/\s+/g, '-');

      itemTemplate.querySelector('.card').className = `card ${itemTitle}`;
      itemTemplate.querySelector('.card').setAttribute('aria-labelledby', `category-${itemTitle}`);
      itemTemplate.querySelector('.banner img').src= `assets/images/icon-${itemTitle}.svg`;
      itemTemplate.querySelector('.category-name').textContent = item.title;
      itemTemplate.querySelector('.category-name').setAttribute('id', `category-${itemTitle}`);
      
      itemTemplate.querySelector('.current-time .daily').textContent = `${item.timeframes.daily.current}hrs`;
      itemTemplate.querySelector('.current-time .weekly').textContent = `${item.timeframes.weekly.current}hrs`;
      itemTemplate.querySelector('.current-time .monthly').textContent = `${item.timeframes.monthly.current}hrs`;

      itemTemplate.querySelector('.previous-time .daily').textContent = `Yesterday - ${item.timeframes.daily.previous}hrs`;
      itemTemplate.querySelector('.previous-time .weekly').textContent = `Last Week - ${item.timeframes.weekly.previous}hrs`;
      itemTemplate.querySelector('.previous-time .monthly').textContent = `Last Month - ${item.timeframes.monthly.previous}hrs`;
    
      container.appendChild(itemTemplate);
    });
  });