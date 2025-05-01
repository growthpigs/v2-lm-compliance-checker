import { Page } from 'puppeteer';
import { checkPrivacyPolicyLink, checkBarAssociationMention, checkCanSpamBasics } from '../complianceRules';

describe('Compliance Rules Tests', () => {
  let mockPage: jest.Mocked<Page>;

  beforeEach(() => {
    // Create a mock Page object
    mockPage = {
      $x: jest.fn(),
      evaluate: jest.fn()
    } as unknown as jest.Mocked<Page>;
  });

  describe('checkPrivacyPolicyLink', () => {
    it('should return true when privacy policy link is found', async () => {
      mockPage.$x.mockResolvedValue([{}]); // Mock finding an element
      const result = await checkPrivacyPolicyLink(mockPage);
      expect(result).toBe(true);
    });

    it('should return false when no privacy policy link is found', async () => {
      mockPage.$x.mockResolvedValue([]); // Mock finding no elements
      const result = await checkPrivacyPolicyLink(mockPage);
      expect(result).toBe(false);
    });

    it('should handle errors gracefully', async () => {
      mockPage.$x.mockRejectedValue(new Error('Test error'));
      const result = await checkPrivacyPolicyLink(mockPage);
      expect(result).toBe(false);
    });
  });

  describe('checkBarAssociationMention', () => {
    it('should return text when bar association mention is found', async () => {
      mockPage.$x.mockResolvedValue([{}]);
      mockPage.evaluate.mockResolvedValue('Member of State Bar of California');
      const result = await checkBarAssociationMention(mockPage);
      expect(result).toBe('Member of State Bar of California');
    });

    it('should return null when no bar association mention is found', async () => {
      mockPage.$x.mockResolvedValue([]);
      const result = await checkBarAssociationMention(mockPage);
      expect(result).toBeNull();
    });

    it('should handle errors gracefully', async () => {
      mockPage.$x.mockRejectedValue(new Error('Test error'));
      const result = await checkBarAssociationMention(mockPage);
      expect(result).toBeNull();
    });
  });

  describe('checkCanSpamBasics', () => {
    it('should detect both contact and unsubscribe info when present', async () => {
      mockPage.$x
        .mockResolvedValueOnce([{}]) // Contact info found
        .mockResolvedValueOnce([{}]); // Unsubscribe info found
      
      const result = await checkCanSpamBasics(mockPage);
      expect(result.hasContactInfo).toBe(true);
      expect(result.hasUnsubscribeInfo).toBe(true);
      expect(result.details).toContain('Contact information found');
      expect(result.details).toContain('Unsubscribe option found');
    });

    it('should detect missing contact and unsubscribe info', async () => {
      mockPage.$x
        .mockResolvedValueOnce([]) // No contact info
        .mockResolvedValueOnce([]); // No unsubscribe info
      
      const result = await checkCanSpamBasics(mockPage);
      expect(result.hasContactInfo).toBe(false);
      expect(result.hasUnsubscribeInfo).toBe(false);
      expect(result.details).toContain('No clear contact information found');
      expect(result.details).toContain('No clear unsubscribe option found');
    });

    it('should handle errors gracefully', async () => {
      mockPage.$x.mockRejectedValue(new Error('Test error'));
      const result = await checkCanSpamBasics(mockPage);
      expect(result.hasContactInfo).toBe(false);
      expect(result.hasUnsubscribeInfo).toBe(false);
      expect(result.details).toContain('Error performing CAN-SPAM compliance check');
    });
  });
}); 