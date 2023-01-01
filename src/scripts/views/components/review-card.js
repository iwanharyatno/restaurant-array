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

  .review-reviewer {
    font-size: 1rem;
    margin: 0;
  }

  .review-date {
    color: var(--color-secondary-dark);
  }

  .review-content {
    padding: 0 1rem;
  }

  .review.skeleton .review-reviewer,
  .review.skeleton .review-date,
  .review.skeleton .review-content {
    background-image: linear-gradient(90deg, var(--color-skeleton) 20%, var(--color-skeleton-shine), var(--color-skeleton));
    background-size: 200%;
    color: transparent;
    animation: shine 1s ease-out infinite;
  }

  @keyframes shine {
    from {
      background-position: 200%;
    }
    
    to {
      background-position: 0%;
    }
  }
  `;

  static properties = {
    reviewData: {},
    skeleton: { type: Boolean },
  };

  constructor(reviewData) {
    super();
    this.reviewData = reviewData || {};
    this.skeleton = false;
  }

  _renderActual() {
    return html`
    <div class="review">
      <div class="review-meta">
        <h3 class="review-reviewer">${this.reviewData.name}</h3>
        <span class="review-date">${this.reviewData.date}</span>
      </div>
      <p class="review-content">${this.reviewData.review}</p>
    </div>
    `;
  }

  static _renderSkeleton() {
    return html`
    <div class="review skeleton">
      <div class="review-meta">
        <h3 class="review-reviewer">reviewer</h3>
        <span class="review-date">31-12-2022</span>
      </div>
      <p class="review-content">Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p>
    </div>
    `;
  }

  render() {
    if (this.skeleton) {
      return ReviewCard._renderSkeleton();
    }
    return this._renderActual();
  }
}
customElements.define('review-card', ReviewCard);

export default ReviewCard;
