import $ from 'cash-dom';
import {githubEventTypes} from './githubEventTypeEnum'

export class Events {

  loadGithubEvents(userName) {
    const self = this;
    fetch(`https://api.github.com/users/${userName}/events/public`)
      .then(response => response.json())
      .then(response => {
        $(".timeline").empty();
        self.updateEventsHistory(response);
        $(".loader").addClass("is-hidden");
        $(".profile-container").removeClass("is-hidden");
        $(".events-container").removeClass("is-hidden");
      })
  }

  updateEventsHistory(events) {
    const self = this;
    events.forEach(element => {
      switch (element.type) {
        case githubEventTypes.PullRequestEvent:
          if (element.payload.action === 'opened' || element.payload.action === 'closed') {
            self.createPullRequestEvent(element);
          }
          break;
        case githubEventTypes.PullRequestReviewCommentEvent:
          self.createPullRequestReviewCommentEvent(element);
          break;
        case githubEventTypes.CheckRunEvent:
          // not implemented
          break;
        case githubEventTypes.ContentReferenceEvent:
          // not implemented
          break;
        case githubEventTypes.CreateEvent:
          // not implemented
          break;
        case githubEventTypes.DeleteEvent:
          // not implemented
          break;
        case githubEventTypes.DeployKeyEvent:
          // not implemented
          break;
        case githubEventTypes.DeploymentEvent:
          // not implemented
          break;
        case githubEventTypes.DeploymentStatusEvent:
          // not implemented
          break;
        case githubEventTypes.DownloadEvent:
          // not implemented
          break;
        case githubEventTypes.FollowEvent:
          // not implemented
          break;
        case githubEventTypes.ForkEvent:
          // not implemented
          break;
        case githubEventTypes.ForkApplyEvent:
          // not implemented
          break;
        case githubEventTypes.GitHubAppAuthorizationEvent:
          // not implemented
          break;
        case githubEventTypes.GistEvent:
          // not implemented
          break;
        case githubEventTypes.GollumEvent:
          // not implemented
          break;
        case githubEventTypes.InstallationEvent:
          // not implemented
          break;
        case githubEventTypes.InstallationRepositoriesEvent:
          // not implemented
          break;
        case githubEventTypes.IssueCommentEvent:
          // not implemented
          break;
        case githubEventTypes.IssuesEvent:
          // not implemented
          break;
        case githubEventTypes.LabelEvent:
          // not implemented
          break;
        case githubEventTypes.MarketplacePurchaseEvent:
          // not implemented
          break;
        case githubEventTypes.MemberEvent:
          // not implemented
          break;
        case githubEventTypes.MembershipEvent:
          // not implemented
          break;
        case githubEventTypes.MetaEvent:
          // not implemented
          break;
        case githubEventTypes.MilestoneEvent:
          // not implemented
          break;
        case githubEventTypes.OrganizationEvent:
          // not implemented
          break;
        case githubEventTypes.OrgBlockEvent:
          // not implemented
          break;
        case githubEventTypes.PageBuildEvent:
          // not implemented
          break;
        case githubEventTypes.ProjectCardEvent:
          // not implemented
          break;
        case githubEventTypes.ProjectColumnEvent:
          // not implemented
          break;
        case githubEventTypes.ProjectEvent:
          // not implemented
          break;
        case githubEventTypes.PublicEvent:
          // not implemented
          break;
        case githubEventTypes.PullRequestReviewEvent:
          // not implemented
          break;
        case githubEventTypes.PushEvent:
          // not implemented
          break;
        case githubEventTypes.RegistryPackageEvent:
          // not implemented
          break;
        case githubEventTypes.ReleaseEvent:
          // not implemented
          break;
        case githubEventTypes.RepositoryEvent:
          // not implemented
          break;
        case githubEventTypes.RepositoryImportEvent:
          // not implemented
          break;
        case githubEventTypes.RepositoryVulnerabilityAlertEvent:
          // not implemented
          break;
        case githubEventTypes.SecurityAdvisoryEvent:
          // not implemented
          break;
        case githubEventTypes.StarEvent:
          // not implemented
          break;
        case githubEventTypes.StatusEvent:
          // not implemented
          break;
        case githubEventTypes.TeamEvent:
          // not implemented
          break;
        case githubEventTypes.TeamAddEvent:
          // not implemented
          break;
        case githubEventTypes.WatchEvent:
          // not implemented
          break;

      }
    });
  }

  createPullRequestEvent(element) {
    const formattedDate = this.formatDate(element.created_at);
    $(".timeline").append(`<div class="timeline-item">
                        <div class="timeline-marker"></div>
                        <div class="timeline-content">
                            <p class="heading">${formattedDate}</p>
                            <div class="content">
                                <div class="flex-container">
                                    <div class="gh-username">
                                        <img src='${element.actor.avatar_url}' />
                                    </div>
                                    <div>
                                        <a href="https://github.com/${element.actor.login}">${element.actor.display_login}</a>
                                        ${element.payload.action}
                                        <a href="${element.payload.pull_request.url}">pull request</a>
                                        <p class="repo-name">
                                            <a href="${element.repo.url}">${element.repo.name}</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`);
  }

  createPullRequestReviewCommentEvent(element) {
    const formattedDate = this.formatDate(element.created_at);
    $(".timeline").append(`<div class="timeline-item is-primary">
                        <div class="timeline-marker is-primary"></div>
                        <div class="timeline-content">
                            <p class="heading">${formattedDate}</p>
                            <div class="content">
                                <div class="flex-container">
                                    <div class="gh-username">
                                        <img src='${element.actor.avatar_url}' />
                                    </div>
                                    <div>
                                        <a href="https://github.com/${element.actor.login}">${element.actor.display_login}</a>
                                        created
                                        <a href="${element.payload.comment.html_url}">comment</a>
                                        to
                                        <a href="${element.payload.comment.url}">pull
                                          request</a>
                                        <p class="repo-name">
                                            <a href="${element.repo.url}">${element.repo.name}</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`);
  }

  formatDate(date) {
    const newDate = new Date(date);
    return `${newDate.toLocaleString('en-us', {month: 'long'})} ${newDate.getDate()}, ${newDate.getFullYear()}`
  }

}
