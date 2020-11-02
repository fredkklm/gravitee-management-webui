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
import { NotificationTemplate } from '../model/notificationTemplate.model';
import NotificationTemplatesService from '../../../../services/notificationTemplates.service';
import NotificationService from '../../../../services/notification.service';
import * as _ from 'lodash';

class NotificationTemplateByTypeController {
  public notifTemplateForm: any;
  private notifTemplate: NotificationTemplate;
  private originalNotifTemplate: NotificationTemplate;
  private isTemplateToInclude: boolean;

  constructor(
    private NotificationTemplatesService: NotificationTemplatesService,
    private NotificationService: NotificationService
  ) {
    'ngInject';
  }

  $onInit() {
    this.originalNotifTemplate = _.clone(this.notifTemplate);
    this.isTemplateToInclude = this.notifTemplate.scope.toUpperCase() === 'TEMPLATES TO INCLUDE';
  }

  save() {
    const that = this;
    this.NotificationTemplatesService.update(this.notifTemplate)
      .then( response => {
        that.notifTemplate = response.data;
        that.originalNotifTemplate = _.clone(that.notifTemplate);
        that.notifTemplateForm.$setPristine();
        that.NotificationService.show(that.notifTemplate.name + ' has been saved.');
      })
    ;
  }

  reset() {
    this.notifTemplate = _.clone(this.originalNotifTemplate);
    this.notifTemplateForm.$setPristine();
  }
}

export default NotificationTemplateByTypeController;
