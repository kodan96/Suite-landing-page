document.addEventListener("DOMContentLoaded", function() {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCountUpAnimation(entry.target.querySelector('.counter'));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 }); // Adjust threshold as needed

    document.querySelectorAll('.stat').forEach(stat => {
        observer.observe(stat);
    });

    function startCountUpAnimation(element) {
        var targetText = $(element).text().trim();
        var targetValue;
    
        // Remove non-numeric characters from the text
        var numericValue = parseFloat(targetText.replace(/[^\d.]/g, ''));
    
        // Check for 'k' or 'M' suffix and convert to the appropriate multiplier
        if (targetText.includes('k')) {
            targetValue = numericValue * 1000;
        } else if (targetText.includes('M')) {
            targetValue = numericValue * 1000000;
        } else {
            targetValue = numericValue;
        }
    
        var duration = 3000;
    
        $({ count: 0 }).animate({ count: targetValue }, {
            duration: duration,
            easing: 'linear',
            step: function() {
                // Format the count with 'k' or 'M' suffix if necessary
                var formattedCount = Math.floor(this.count);
                if (formattedCount >= 1000000) {
                    formattedCount = (formattedCount / 1000000).toFixed(1) + 'M';
                } else if (formattedCount >= 1000) {
                    formattedCount = (formattedCount / 1000).toFixed(1) + 'k';
                }
                // Add back the '+' symbol if it was present in the original text
                if (targetText.includes('+')) {
                    formattedCount += '+';
                }
                $(element).text(formattedCount);
            },
            complete: function() {
                // Set the final value with 'k' or 'M' suffix if necessary
                var formattedValue = Math.floor(targetValue);
                if (formattedValue >= 1000000) {
                    formattedValue = (formattedValue / 1000000).toFixed(1) + 'M';
                } else if (formattedValue >= 1000) {
                    formattedValue = (formattedValue / 1000).toFixed(1) + 'k';
                }
                // Add back the '+' symbol if it was present in the original text
                if (targetText.includes('+')) {
                    formattedValue += '+';
                }
                $(element).text(formattedValue);
            }
        });
    }
});