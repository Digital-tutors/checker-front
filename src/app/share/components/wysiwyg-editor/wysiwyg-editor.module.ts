import {NgModule} from '@angular/core';
import {CKEditorModule} from '@ckeditor/ckeditor5-angular';
import {WysiwygEditorComponent} from '@share/components/wysiwyg-editor/wysiwyg-editor.component';

@NgModule({
  declarations: [WysiwygEditorComponent],
  imports: [CKEditorModule],
  exports: [WysiwygEditorComponent],
})
export class WysiwygEditorModule {}
