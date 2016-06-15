/*
Author: fulvio 'futre' corsini
Website http://fulviocorsini.it

Copyright

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>
 */
(function(e) {


    function cookieLaw(t) {
        this.options = e.extend({}, s, t);
		
        if (!document.cookie.indexOf(this.options.cookieName)) 
            this.modal();
        else 
			this.init();
    }
    var s = {
            defaultText: "Cliccando sul bottone [Accetto] approvi l'utilizzo dei cookie sul nostro sito per una migliore esperienza di navigazione.",
            modalText: "Le tue preferenze riguardo questo sito",
            okButton: "Accetto",
			saveButton: "Salva",
			closeButton: "Chiudi",
            moreButton: "Visualizza dettagli",
			hideMoreButton: "Nascondi dettagli",
            moreInfo: "I cookie sono piccoli file, memorizzati nel computer durante la navigazione, utili a salvare le preferenze e a migliorare le prestazioni dei siti web. In questo modo si ottimizza l'esperienza di navigazione da parte dell'utente.<p><strong>Seleziona le tue preferenze.</strong></p>",
            displayUrl: false,
			moreUrl: "",
			textUrl: "Visualizza privacy",
            location: "top",
            cookieExpiry: 365,
            cookieName: "CookieLaw",
			initOnScroll:false,
			defaultCookies: {
				necessary: {
					title: "Tecnici",
					description: "Cookie essenziali per l'erogazione dei servizi richiesti. Sono necessari per il corretto funzionamento del sito e non richiedono consenso da parte dell'utente."
				},
				social: {
					title: "Social",
					description: "Cookie di terze parti che permettono l'interazione con i social network (Google Plus, Facebook, Twitter, Pinterest). Questi cookie mettono a disposizione dell'utente la possibilità di interagire e condividere contenuti ritenuti di interesse."
				},
				analytics: {
					title: "Analisi",
					description: "Cookie di terze parti che permettono di analizzare come gli utenti utilizzano il sito per operare in modo da offrire la migliore esperienza possibile."
				},
				advertising: {
					title: "Contenuti",
					description: "Cookie di terze parti che possono essere utilizzati per offrire un'esperienza d'uso più ricca all'utente tramite contenuti multimediali (Youtube, Vimeo o simili)."
				}
			},
            ok: function() {}
			
        };
    cookieLaw.prototype.init = function() {
		
		var a = '';
		if (this.options.moreUrl && this.options.displayUrl != '') 
		a = "<p><a class='moreUrl' href='"+this.options.moreUrl+"'>"+this.options.textUrl+"</a></p>";
		
        var b = '<div id="cookie-law-info"><div id="cookie-law-text">' + this.options.moreInfo + '</div><div style="clear:both;"></div></div>';
        var c = '<a class="cookie-law-button" id="cookie-law-button-more" href="#cookie-law-more-info">' + this.options.moreButton + "</a>"
       
        var d = '<div id="cookie-law-box"><div id="cookie-law-message">' + this.options.defaultText + '</div><div id="cookie-law-action" style="float:right;"><a class="cookie-law-button" id="cookie-law-button-ok" href="#">' + this.options.okButton + "</a>" + c + '</div><div style="clear:both;"></div></div>';
		
		$("body").append('<div id="cookie-law-container" class="' + this.options.location + '">' + b + d + "</div>");
        
		var style;
		var disabled;
		
		$.each(this.options.defaultCookies, function(a, b) {
			style = a=='necessary' ? 'inactive' : '';
			disabled = a=='necessary' ? 'disabled' : '';
			$("#cookie-law-info").append('<div class="div-checkbox ' + style + '"><label><input ' + disabled + ' type="checkbox" checked="checked" name="type" id="' + a + '" />&nbsp;' + b.title + "</label>" + b.description + "</div>");
		});
		
		$("#cookie-law-info").append(a);
		
		this.action()
    };
	
    cookieLaw.prototype.action = function() {
	
        function get_cookie(e) {
            var a = new RegExp(e + "=([^;]+)");
            var b = a.exec(document.cookie);
            return b != null ? unescape(b[1]) : null
        }
		
        var t = this.options;
		
        $("#cookie-law-button-ok").click(function(e) {
            e.preventDefault();
			date = new Date();
			date.setDate(date.getDate() - 1);
			$.each(t.defaultCookies, function(a, b) {
				document.cookie = escape(a) + "=; path=/; expires=" + date
			})
            document.cookie = t.cookieName + "=accepted;path=/;max-age=" + 60 * 60 * 24 * t.cookieExpiry;
			$("input:checkbox[name=type]:checked").each(function() {
				var id = $(this).attr('id');
				document.cookie = id + "=accepted;path=/;max-age=" + 60 * 60 * 24 * t.cookieExpiry;
			});
			
			$("#cookie-law-container").slideUp(250);
			setTimeout("location.reload(true);", 250)
			
        });

        $("#cookie-law-button-more").click(function(e) {
            e.preventDefault();
			$(this).html($(this).html() == t.moreButton ? t.hideMoreButton : t.moreButton);
			$("#cookie-law-info").slideToggle(400)
         });
		 
		 $("#cookie-law-modal").click(function(e) {
            e.preventDefault();
			$("#cookie-law-container").slideToggle(400)
         })
		 
		  $("#cookie-law-button-close").click(function(e) {
            e.preventDefault();
			$("#cookie-law-container").slideToggle(400)
         })
		 

		$("input:checkbox[name=type]").change(function() {
            if ($(this).is(":checked")) {
                $(this).parent().parent().removeClass("inactive")
            } else {
                $(this).parent().parent().addClass("inactive")
            }
        });
		
        if (get_cookie(t.cookieName) != "accepted") {
            $("#cookie-law-container").slideDown(400)
        }
		
		this.refresh();
		
		if (get_cookie(t.cookieName) != "accepted" && this.options.initOnScroll) {
			$(window).scroll(function (event) {
				var scroll = $(window).scrollTop();
				$( "#cookie-law-button-ok" ).click();
			});
		}
    };
	
	cookieLaw.prototype.refresh = function() {
	
		$.each(this.options.defaultCookies, function(a, b) {
			if (document.cookie.indexOf(a) >= 0) {
				$('.'+a+'-yes').show();
				$('.'+a+'-no').hide();
				} else {
				$('.'+a+'-no').show();
				$('.'+a+'-yes').hide();
          	}
		})
	}
	
	cookieLaw.prototype.modal = function() {
	
		var a = '';
		if (this.options.moreUrl && this.options.displayUrl != '') 
		a = "<a class='moreUrl' href='"+this.options.moreUrl+"'>"+this.options.textUrl+"</a>";
		
        var b = '<div id="cookie-law-info" style="display:block"><strong>' + this.options.modalText + '</strong></div>';
        var c = '<div id="cookie-law-box"><div id="cookie-law-message">' + a + '</div><div id="cookie-law-action" style="float:right;"><a class="cookie-law-button" id="cookie-law-button-ok" href="#">' + this.options.saveButton + '</a>&nbsp;<a class="cookie-law-button" id="cookie-law-button-close" href="#">' + this.options.closeButton + '</a></div><div style="clear:both;"></div></div>';


        $("body").append('<div id="cookie-law-container" class="' + this.options.location + '">' + b + c + "</div>");
        
		var disabled;
		
		$.each(this.options.defaultCookies, function(a, b) {
			disabled = a=='necessary' ? 'disabled' : '';
			if (document.cookie.indexOf(a) >= 0) {
				$("#cookie-law-info").append('<div class="div-checkbox"><label><input ' + disabled + ' type="checkbox" checked="checked" name="type" id="' + a + '" />&nbsp;<strong>' + b.title + "</strong></label><div>" + b.description + "</div></div>");
				} else {
				$("#cookie-law-info").append('<div class="div-checkbox inactive"><label><input ' + disabled + ' type="checkbox" name="type" id="' + a + '" />&nbsp;<strong>' + b.title + "</strong></label><div>" + b.description + "</div></div>");
          	}
		})
		
		this.action()
    };
	
    $.fn['cookieLaw'] = function(e) {
        new cookieLaw(e)
    }
})(jQuery)