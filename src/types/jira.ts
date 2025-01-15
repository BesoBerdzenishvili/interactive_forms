export interface AtlassianIssue {
  expand: string;
  id: string;
  self: string;
  key: string;
  fields: {
    summary: string;
    issuetype: {
      self: string;
      id: string;
      description: string;
      iconUrl: string;
      name: string;
      subtask: boolean;
      avatarId: number;
      entityId: string;
      hierarchyLevel: number;
    };
    description: string;
    reporter: {
      self: string;
      accountId: string;
      avatarUrls: {
        "48x48": string;
        "24x24": string;
        "16x16": string;
        "32x32": string;
      };
      displayName: string;
      active: boolean;
      timeZone: string;
      accountType: string;
    };
    assignee: null | {
      self: string;
      accountId: string;
      avatarUrls: {
        "48x48": string;
        "24x24": string;
        "16x16": string;
        "32x32": string;
      };
      displayName: string;
      active: boolean;
      timeZone: string;
      accountType: string;
    };
    priority: {
      self: string;
      iconUrl: string;
      name: string;
      id: string;
    };
    customfield_10037: {
      self: string;
      value: string;
      id: string;
    };
    status: {
      self: string;
      description: string;
      iconUrl: string;
      name: string;
      id: string;
      statusCategory: {
        self: string;
        id: number;
        key: string;
        colorName: string;
        name: string;
      };
    };
  };
}
