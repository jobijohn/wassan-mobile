var Controller = function() {
    
    var controller = {
        self: null,
        initialize: function() {
            self = this;
            new SQLiteStorageService().done(function(service) {
                self.storageService = service;   
                self.bindEvents();
                self.renderSearchView(); 
            }).fail(function(error) {
                alert(error);
            });

        },

        bindEvents: function() {
        	$('.tab-button').on('click', this.onTabClick);

        },

        onTabClick: function(e) {
        	e.preventDefault();
            if ($(this).hasClass('active')) {
                return;
            }
        	
            var tab = $(this).data('tab');
            if (tab === '#add-tab') {
                self.renderPostView();
            } else {
                self.renderSearchView();
            }
        },

        renderPostView: function() {
            $('.tab-button').removeClass('active');
            $('#post-tab-button').addClass('active');

            var $tab = $('#tab-content');
            $tab.empty();
            $("#tab-content").load("./views/create-issue-view.html", function(data) {
                $('#tab-content').find('#post-project-form').on('submit', self.createIssue);
            }); 
        },
        

        createIssue: function(e) {

            e.preventDefault();
            var issueType = $('#issue-type').val();
            var summary = $('#summary').val();
            var district = $('#ap-district').val();
            var taluk = $('#ap-taluk').val();
            var seedName = $('#ap-seed-name').val();
            var seedQty = $('#ap-seed-qty').val();
            var acres = $('#ap-acres').val();

            if (!issueType || !summary || !district || !taluk || !seedName || !seedQty || !acres) {
                alert('Please fill in all fields');
                return;
            } else {

                //TODO: Add to JIRA////////////
                var result = self.storageService.addProject(
                    issueType, summary, district, taluk, seedName, seedQty, acres);
                ////////////////

                result.done(function() {
                    alert('Issue successfully created');
                    self.renderSearchView();
                }).fail(function(error) {
                    alert(error);
                });
            }
        },


        renderSearchView: function() {
            $('.tab-button').removeClass('active');
            $('#search-tab-button').addClass('active');

            var $tab = $('#tab-content');
            $tab.empty();

            var $projectTemplate = null;
            $("#tab-content").load("./views/search-issue-view.html", function(data) {
                $projectTemplate = $('.project').remove();

                var projects = self.storageService.getProjects().done(function(projects) {

                    for(var idx in projects) {
                        var $div = $projectTemplate.clone();
                        var project = projects[idx];

                        $div.find('.project-name').text(project.name);
                        $div.find('.project-company').text(project.company);
                        $div.find('.project-description').text(project.description);

                        if (project.location) {
                            var url = 
                                '<a target="_blank" href="https://www.google.com.au/maps/preview/@' + 
                                project.location.latitude + ',' + project.location.longitude + ',10z">Click to open map</a>';
                            
                            $div.find('.project-location').html(url);
                        } else {
                            $div.find('.project-location').text("Not specified");
                        }

                        $tab.append($div);
                    }
                }).fail(function(error) {
                    alert(error);
                });
            }); 
        }
    }
    controller.initialize();
    return controller;
}
