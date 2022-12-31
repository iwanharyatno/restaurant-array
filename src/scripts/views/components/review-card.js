import { LitElement, html, css } from 'lit';

class ReviewCard extends LitElement {
  static styles = css`
  .review {
    border: 1px solid var(--color-secondary);
    margin: inherit;
    border-radius: 0.3rem;
  }

  .review-meta {
    border-bottom: 1px solid var(--color-secondary);
    padding: 1rem;
  }

  .review h3 {
    font-size: 1rem;
    margin: 0;
  }

  .review-date {
    color: var(--color-secondary-dark);
  }

  .review-content {
    padding: 0 1rem;
  }
  `;

  static properties = {
    reviewData: {},
  };

  constructor(reviewData) {
    super();
    this.reviewData = reviewData || {};
  }

  render() {
    return html`
    <div class="review" role="review">
      <div class="review-meta">
        <h3 class="review-reviewer">${this.reviewData.name}</h3>
        <span class="review-date">${this.reviewData.date}</span>
      </div>
      <p class="review-content">${this.reviewData.review}</p>
    </div>
    `;
  }
}
customElements.define('review-card', ReviewCard);

export default ReviewCard;
