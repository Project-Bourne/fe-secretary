import { request } from '@/hooks/api';

class HomeService {
    /**
     * summarising text contents.
     * @param {Object} summarytext - The data of the sumarry.
     * @returns {Promise<Object>} - The response data from the server.
     */

    async summarizeText(summarytext) {
      try {
        const response = await request('/summary', 'POST', summarytext, true, false, false);
        return response;
      } catch (error) {
        throw error;
      }
    }
    
    async summarizePDF(summaryPDF) {
      try {
        const formData = new FormData();
        for (const key in summaryPDF) {
          formData.append(key, summaryPDF[key]);
        }
        const response = await fetch('http://localhost:4070/summary/file/', {
          method: 'POST',
          body: formData
        });
        const data = await response.json(); // Assuming the server responds with JSON
        return data;
      } catch (error) {
        throw error;
      }
    }
    
  
    /**
     * Delete a workspace by its ID.
     * @param {string} summarytextId - The ID of the workspace to delete.
     * @returns {Promise<void>} - Resolves when the workspace is deleted successfully.
     */

    async deleteSummarizeText(summarytextId) {
      try {
        await request(`/workspaces/${summarytextId}`, 'DELETE', {}, true, false, false);
      } catch (error) {
        throw error;
      }
    }
  
    /**
     * Update a workspace by its ID.
     * @param {string} summarytextId - The ID of the workspace to update.
     * @param {Object} updatedData - The updated data of the workspace.
     * @returns {Promise<Object>} - The response data from the server.
     */
    async updateWorkspace(summarytextId, updatedData) {
      try {
        const response = await request(`/space/${summarytextId}`, 'PATCH', updatedData, true, false, false);
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
        const response = await request(`/summary/${id}`, 'GET', {}, true, true, false);
        if(response.status == false){
            return false;
        }
        return JSON.parse(response);
    
      } catch (error) {
        throw error;
      }
    }






  }
  
  // Export the Service class.
  export default HomeService;