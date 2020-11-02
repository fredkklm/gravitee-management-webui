/*
 * Copyright (C) 2015 The Gravitee team (http://gravitee.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { NotificationTemplate } from './model/notificationTemplate.model';

class NotificationTemplatesController {
  private notificationTemplates: NotificationTemplate[];

  private notifTemplatesMap: any = {};

  private readonly _templatesToInclude = 'TEMPLATES TO INCLUDE';

  constructor() {
    'ngInject';
  }

  $onInit() {
    this.notificationTemplates.sort((a, b) => {
      return a.scope.localeCompare(b.scope) || a.name.localeCompare(b.name);
    });

    this.notificationTemplates.forEach(notifTemplate => {
      const scope = notifTemplate.scope;
      const name = notifTemplate.name;
      if (!this.notifTemplatesMap[scope]) {
        this.notifTemplatesMap[scope] = { };
      }
      if (!this.notifTemplatesMap[scope][name]) {
        this.notifTemplatesMap[scope][name] = {};
      }
      if (scope === this._templatesToInclude) {
        this.notifTemplatesMap[scope][name].id = notifTemplate.id;
        this.notifTemplatesMap[scope][name].hasEmailId = true;
      } else {
        this.notifTemplatesMap[scope][name].id = notifTemplate.id.substring(0, notifTemplate.id.lastIndexOf('.'));
        if (notifTemplate.type.toUpperCase() === 'PORTAL') {
          this.notifTemplatesMap[scope][name].hasPortalId = true;
        } else {
          this.notifTemplatesMap[scope][name].hasEmailId = true;
        }
      }
      this.notifTemplatesMap[scope][name].description = notifTemplate.description;
      if (notifTemplate.enabled) {
        this.notifTemplatesMap[scope][name].overridden = true;
      }
    });
  }
}

export default NotificationTemplatesController;
