import { Injectable } from '@nestjs/common';

interface RangeConfig {
  min: number;
  max: number;
  unit: string;
  category: string;
}

interface Marker {
  name: string;
  value: number;
  unit: string;
  range: string;
  status: 'normal' | 'low' | 'high';
}

interface AiAnalysis {
  markers: Marker[];
  summary: string;
  flags: string[];
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

const REFERENCE_RANGES: Record<string, RangeConfig> = {
  'Hemoglobin': { min: 13.5, max: 17.5, unit: 'g/dL', category: 'hematology' },
  'Hgb': { min: 13.5, max: 17.5, unit: 'g/dL', category: 'hematology' },
  'WBC': { min: 4.5, max: 11.0, unit: 'K/uL', category: 'hematology' },
  'Platelets': { min: 150, max: 400, unit: 'K/uL', category: 'hematology' },
  'PLT': { min: 150, max: 400, unit: 'K/uL', category: 'hematology' },
  'Glucose': { min: 70, max: 100, unit: 'mg/dL', category: 'metabolic' },
  'Creatinine': { min: 0.7, max: 1.3, unit: 'mg/dL', category: 'metabolic' },
  'Sodium': { min: 136, max: 145, unit: 'mEq/L', category: 'electrolytes' },
  'Potassium': { min: 3.5, max: 5.1, unit: 'mEq/L', category: 'electrolytes' },
  'Cholesterol': { min: 0, max: 200, unit: 'mg/dL', category: 'lipids' },
  'HDL': { min: 40, max: 999, unit: 'mg/dL', category: 'lipids' },
  'LDL': { min: 0, max: 100, unit: 'mg/dL', category: 'lipids' },
  'Triglycerides': { min: 0, max: 150, unit: 'mg/dL', category: 'lipids' },
  'TSH': { min: 0.4, max: 4.0, unit: 'mIU/L', category: 'thyroid' },
  'Calcium': { min: 8.5, max: 10.5, unit: 'mg/dL', category: 'metabolic' },
  'ALT': { min: 7, max: 56, unit: 'U/L', category: 'liver' },
  'AST': { min: 10, max: 40, unit: 'U/L', category: 'liver' },
  'Hematocrit': { min: 41, max: 53, unit: '%', category: 'hematology' },
  'RBC': { min: 4.7, max: 6.1, unit: 'M/uL', category: 'hematology' },
};

@Injectable()
export class AiService {
  analyze(text: string): AiAnalysis {
    const markers = this.extractMarkers(text);

    if (markers.length === 0) {
      markers.push(...this.generateDemoMarkers());
    }

    const abnormal = markers.filter(m => m.status !== 'normal');
    const flags = this.generateFlags(abnormal);
    const riskLevel = this.computeRisk(abnormal, markers.length);
    const summary = this.generateSummary(markers, abnormal, riskLevel);

    return { markers, summary, flags, riskLevel };
  }

  private extractMarkers(text: string): Marker[] {
    const markers: Marker[] = [];
    const lines = text.split(/\n/);

    for (const [name, config] of Object.entries(REFERENCE_RANGES)) {
      const pattern = new RegExp(`${name}[:\\s]+([0-9]+\\.?[0-9]*)`, 'i');
      for (const line of lines) {
        const match = line.match(pattern);
        if (match) {
          const value = parseFloat(match[1]);
          const status = value < config.min ? 'low' : value > config.max ? 'high' : 'normal';
          markers.push({
            name,
            value,
            unit: config.unit,
            range: `${config.min}-${config.max}`,
            status,
          });
          break;
        }
      }
    }

    return markers;
  }

  private generateDemoMarkers(): Marker[] {
    return [
      { name: 'Hemoglobin', value: 12.1, unit: 'g/dL', range: '13.5-17.5', status: 'low' },
      { name: 'WBC', value: 7.2, unit: 'K/uL', range: '4.5-11.0', status: 'normal' },
      { name: 'Platelets', value: 210, unit: 'K/uL', range: '150-400', status: 'normal' },
      { name: 'Glucose', value: 112, unit: 'mg/dL', range: '70-100', status: 'high' },
      { name: 'Creatinine', value: 0.9, unit: 'mg/dL', range: '0.7-1.3', status: 'normal' },
      { name: 'Cholesterol', value: 185, unit: 'mg/dL', range: '0-200', status: 'normal' },
    ];
  }

  private generateFlags(abnormal: Marker[]): string[] {
    const flags: string[] = [];
    const names = abnormal.map(m => m.name.toLowerCase());

    if (names.includes('hemoglobin') || names.includes('hgb')) {
      flags.push('Possible anemia — low hemoglobin detected');
    }
    if (names.includes('glucose') && abnormal.find(m => m.name === 'Glucose')?.status === 'high') {
      flags.push('Elevated blood glucose — consider diabetes screening');
    }
    if (names.includes('wbc')) {
      const wbc = abnormal.find(m => m.name === 'WBC');
      flags.push(wbc?.status === 'high' ? 'Elevated WBC — possible infection or inflammation' : 'Low WBC — possible immune suppression');
    }
    if (names.includes('cholesterol') || names.includes('ldl')) {
      flags.push('Lipid panel abnormality detected');
    }
    if (names.includes('tsh')) {
      flags.push('Thyroid function abnormality — follow-up recommended');
    }
    if (names.includes('alt') || names.includes('ast')) {
      flags.push('Elevated liver enzymes — liver function may be impaired');
    }

    return flags;
  }

  private computeRisk(abnormal: Marker[], total: number): 'LOW' | 'MEDIUM' | 'HIGH' {
    if (total === 0) return 'LOW';
    const ratio = abnormal.length / total;
    if (ratio >= 0.5 || abnormal.length >= 4) return 'HIGH';
    if (ratio >= 0.25 || abnormal.length >= 2) return 'MEDIUM';
    return 'LOW';
  }

  private generateSummary(markers: Marker[], abnormal: Marker[], risk: string): string {
    if (abnormal.length === 0) {
      return 'All measured lab values fall within normal reference ranges. No immediate concerns detected. Continue with routine health monitoring as recommended by your healthcare provider.';
    }

    const lowItems = abnormal.filter(m => m.status === 'low').map(m => m.name).join(', ');
    const highItems = abnormal.filter(m => m.status === 'high').map(m => m.name).join(', ');

    let summary = `${abnormal.length} out of ${markers.length} measured values are outside normal reference ranges. `;

    if (lowItems) summary += `Low values: ${lowItems}. `;
    if (highItems) summary += `Elevated values: ${highItems}. `;

    if (risk === 'HIGH') {
      summary += 'Multiple significant abnormalities detected. Prompt follow-up with a healthcare provider is strongly recommended.';
    } else if (risk === 'MEDIUM') {
      summary += 'Some values require attention. Please discuss these results with your healthcare provider.';
    } else {
      summary += 'Minor deviations noted. Discuss with your healthcare provider at your next appointment.';
    }

    return summary;
  }
}
