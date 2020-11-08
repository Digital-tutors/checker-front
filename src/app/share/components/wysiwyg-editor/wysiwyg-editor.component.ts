import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import * as DocumentEditor from './editor/ckeditor';
import {CKEditor5, CKEditorComponent} from '@ckeditor/ckeditor5-angular';

const TOOLBAR = [
  'undo',
  'redo',
  '|',
  'codeBlock',
  'insertTable',
  'link',
  'blockQuote',
  '|',
  'fontSize',
  'bold',
  'italic',
  'underline',
  '|',
  'numberedList',
  'bulletedList',
  '|',
  'alignment:left',
  'alignment:center',
  'alignment:right',
];

@Component({
  selector: 'app-wysiwyg-editor',
  templateUrl: './wysiwyg-editor.component.html',
  styleUrls: ['./wysiwyg-editor.component.scss'],
})
export class WysiwygEditorComponent {
  @Input() public id = 'toolbar-container';
  @Input() public initialData: string;
  @Input() public readOnly = false;

  @Output() public valueChange: EventEmitter<string> = new EventEmitter();

  @ViewChild('ckeditor', { static: false })
  public editorOut: CKEditorComponent;
  public editor = DocumentEditor;
  public editorComponent: CKEditor5.Editor;
  public config: CKEditor5.Config =  {
    toolbar: TOOLBAR,
    language: 'ru',
    link: { addTargetToExternalLinks: true },
  };
  public ready = false;

  constructor() {}

  public onChange({ editor }: any): void {
    if (!this.ready) {
      return;
    }
    this.valueChange.emit(editor.getData());
  }

  public onReady(editor: any): void {
    this.editorComponent = editor;
    editor.setData(this.initialData || '');
    const toolbarContainer: Node = document.querySelector(`#${this.id}`);
    if (!this.readOnly) {
      toolbarContainer.appendChild(editor.ui.view.toolbar.element);
    }
    setTimeout(() => (this.ready = true), 0);
  }

  public setValue(data: string) {
    this.editorComponent.setData(data);
  }
}
