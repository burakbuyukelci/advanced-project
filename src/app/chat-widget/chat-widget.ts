import { Component, ChangeDetectorRef, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Gemini } from '../gemini';

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-widget.html',
  styleUrl: './chat-widget.css'
})
export class ChatWidget implements AfterViewChecked {
  isOpen: boolean = false;
  userQuery: string = '';
  loading: boolean = false;
  messages: { sender: 'user' | 'ai', text: string }[] = [];

  @ViewChild('chatScroll') private chatScrollContainer!: ElementRef;

  constructor(private geminiService: Gemini, private cdr: ChangeDetectorRef) {
     this.messages.push({
       sender: 'ai',
       text: 'Merhaba! Ben DataPulse AI Asistan. Sana nasıl yardımcı olabilirim?'
     });
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.chatScrollContainer.nativeElement.scrollTop = this.chatScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  async sendMessage() {
    if (!this.userQuery.trim() || this.loading) return;

    const currentQuery = this.userQuery;
    this.messages.push({ sender: 'user', text: currentQuery });
    this.userQuery = '';
    this.loading = true;

    const aiMessageIndex = this.messages.push({ sender: 'ai', text: '' }) - 1;

    try {
      await this.geminiService.askQuestionStream(currentQuery, (textChunk) => {
        this.messages[aiMessageIndex].text = textChunk;
        this.cdr.detectChanges();
      });
    } catch (error) {
      this.messages[aiMessageIndex].text = "Bir hata oluştu, lütfen tekrar sor.";
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }
}
