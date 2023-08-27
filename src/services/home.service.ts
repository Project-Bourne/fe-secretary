import { request } from '@/hooks/api';

class HomeService {
  /**
   * summarising text contents.
   * @param {Object} summarytext - The data of the sumarry.
   * @returns {Promise<Object>} - The response data from the server.
   */

  async summarizeText(summarytext) {
    try {
      const response = await request(
        '/summary',
        'POST',
        summarytext,
        true,
        false,
        false
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * summarising text contents.
   * @param {Object} summaryUpload - The data of the sumarry.
   * @returns {Promise<Object>} - The response data from the server.
   */
 
  async summarizeUpload(uploadData) {
    try {
      const response = await request(
        '/summary/file',
        'POST',
        uploadData,
        true,
        false,
        false
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get a workspace by its ID.
   * @param {string} summarytextId - The ID of the workspace to get.
   * @returns {Promise<Object>} - The response data from the server.
   */

  async getSummaryText(id) {
    try {
      const response = await request(
        `/summary/${id}`,
        'GET',
        {},
        true,
        true,
        false
      );
      if (response.status == false) {
        return false;
      }
      return JSON.parse(response);
    } catch (error) {
      throw error;
    }
  }

  async getSummaryHistory() {
    try {
      const response = await request(
        '/summary/user',
        'GET',
        {},
        true,
        true,
        false
      );
      if (response.status == false) {
        return false;
      }
      return JSON.parse(response);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete a summary by its ID.
   * @param {string} id - The ID of the summary to delete.
   * @returns {Promise<void>} - Resolves when the workspace is deleted successfully.
   */

  static async deleteSummary(id) {
    try {
      await request(
        `/delete/summary/history/${id}`,
        'PUT',
        {},
        true,
        false,
        false
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete a summary by its ID.
   * @param {string} id - The ID of the summary to delete.
   * @returns {Promise<void>} - Resolves when the workspace is deleted successfully.
   */

  static async bookMarkSummary(id) {
    try {
      await request(
        `/bookmark/summary/${id}`,
        'PUT',
        {},
        true,
        false,
        false
      );
    } catch (error) {
      throw error;
    }
  }
}

// Export the Service class.
export default HomeService;
